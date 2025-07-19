export default {
    
    expose: ['getChart', 'update', 'reset', 'destroy', 'render', 'stop', 'getBase64Image', 'getDatasetAtEvent'],

    data: function() {
        return {
            chart: null,
            resizeObserver: null,
            error: null,
            loading: true
        }
    },

    props: {
        type: {
            type: String,
            default: 'line',
            validator: function(value) {
                return ['line', 'bar', 'radar', 'doughnut', 'pie', 'polarArea', 'bubble', 'scatter'].includes(value);
            }
        },
        data: {
            type: Object,
            required: true,
            validator: function(value) {
                return value &&
                       Array.isArray(value.labels) &&
                       Array.isArray(value.datasets) &&
                       value.datasets.every(dataset => Array.isArray(dataset.data));
            }
        },
        options: {
            type: Object,
            default: () => ({})
        },
        height: {
            type: String,
            default: '300px'
        },
        width: {
            type: String,
            default: '100%'
        },
        plugins: {
            type: Array,
            default: () => []
        },
        updateMode: {
            type: String,
            default: 'none',
            validator: function(value) {
                return ['none', 'hide', 'show', 'default', 'active', 'resize', 'reset'].includes(value);
            }
        },
        useCurrentColor: {
            type: Boolean,
            default: true
        }
    },

    watch: {
        type: {
            handler: function(newType, oldType) {
                if (newType !== oldType && this.chart) {
                    this.recreateChart();
                }
            }
        },
        data: {
            handler: function(newData) {
                if (this.chart && this.validateData(newData)) {
                    try {
                        // Get current color and prepare data with defaults
                        const currentColor = this.useCurrentColor ? this.getCurrentColor() : null;
                        const preparedData = this.prepareDataWithDefaults(newData, currentColor);

                        // Update chart data
                        this.chart.data = preparedData;
                        this.chart.update(this.updateMode);
                    } catch (error) {
                        this.handleError('Failed to update chart data', error);
                    }
                }
            },
            deep: true
        },
        options: {
            handler: function(newOptions) {
                if (this.chart) {
                    try {
                        // Merge with defaults and avoid mutation
                        const mergedOptions = this.getMergedOptions(newOptions);
                        this.chart.options = mergedOptions;
                        this.chart.update(this.updateMode);
                    } catch (error) {
                        this.handleError('Failed to update chart options', error);
                    }
                }
            },
            deep: true
        }
    },

    computed: {
        containerStyles() {
            return {
                width: this.width,
                height: this.height,
                position: 'relative',
                display: 'block'
            };
        },
        hasValidData() {
            return this.validateData(this.data);
        }
    },

    methods: {
        validateData(data) {
            if (!data || typeof data !== 'object') {
                this.error = 'Invalid data: must be an object';
                return false;
            }
            if (!Array.isArray(data.labels)) {
                this.error = 'Invalid data: labels must be an array';
                return false;
            }
            if (!Array.isArray(data.datasets)) {
                this.error = 'Invalid data: datasets must be an array';
                return false;
            }
            if (!data.datasets.every(dataset => Array.isArray(dataset.data))) {
                this.error = 'Invalid data: each dataset must have a data array';
                return false;
            }
            this.error = null;
            return true;
        },

        getDefaultOptions(currentColor = null) {
            const options = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            };

            // Apply currentColor to text elements if provided
            if (currentColor) {
                // Convert to RGB for opacity support
                const rgb = this.colorToRgb(currentColor);
                const gridColor = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)` : currentColor + '20';
                const borderColor = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` : currentColor + '33';
                
                options.plugins.legend.labels = {
                    color: currentColor
                };
                
                options.scales = {
                    x: {
                        ticks: { 
                            color: currentColor 
                        },
                        grid: { 
                            color: gridColor,
                            borderColor: borderColor
                        },
                        border: {
                            color: borderColor
                        }
                    },
                    y: {
                        ticks: { 
                            color: currentColor 
                        },
                        grid: { 
                            color: gridColor,
                            borderColor: borderColor
                        },
                        border: {
                            color: borderColor
                        }
                    }
                };
                
                // For radar charts
                if (this.type === 'radar') {
                    options.scales = {
                        r: {
                            ticks: { 
                                color: currentColor,
                                backdropColor: 'transparent'
                            },
                            grid: { 
                                color: gridColor 
                            },
                            pointLabels: { 
                                color: currentColor 
                            },
                            angleLines: { 
                                color: gridColor 
                            }
                        }
                    };
                }
                
                // For polar area charts
                if (this.type === 'polarArea') {
                    options.scales = {
                        r: {
                            ticks: { 
                                color: currentColor,
                                backdropColor: 'transparent'
                            },
                            grid: { 
                                color: gridColor 
                            }
                        }
                    };
                }
            }

            return options;
        },

        getMergedOptions(customOptions = {}, currentColor = null) {
            // Deep merge to avoid mutations
            const defaults = this.getDefaultOptions(currentColor);
            return this.deepMerge(defaults, customOptions);
        },

        deepMerge(target, source) {
            const result = Object.assign({}, target);

            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                        result[key] = this.deepMerge(result[key] || {}, source[key]);
                    } else {
                        result[key] = source[key];
                    }
                }
            }

            return result;
        },

        getCurrentColor() {
            // Get the computed color from the container element
            const container = this.$el;
            if (container) {
                const computedStyle = window.getComputedStyle(container);
                return computedStyle.color || null;
            }
            return null;
        },

        prepareDataWithDefaults(originalData, currentColor) {
            // Deep clone the data
            const data = JSON.parse(JSON.stringify(originalData));

            // If no currentColor, return as is
            if (!currentColor) {
                return data;
            }

            // Convert currentColor to RGB for transparency support
            const rgb = this.colorToRgb(currentColor);
            if (!rgb) {
                return data;
            }

            // Apply default colors to datasets that don't have colors specified
            data.datasets = data.datasets.map((dataset, index) => {
                // For multiple datasets, generate distinct variations
                let datasetColor;
                if (data.datasets.length > 1) {
                    // Use hue shifting for multiple datasets to make them more distinct
                    const hueShift = (index * (360 / Math.max(data.datasets.length, 3))) % 360;
                    datasetColor = this.adjustHue(rgb, hueShift, 1);
                    
                    // Parse the new color to RGB
                    const newRgb = this.colorToRgb(datasetColor);
                    if (newRgb) {
                        // Line, radar, and scatter charts
                        if (['line', 'radar', 'scatter'].includes(this.type)) {
                            if (!dataset.borderColor) {
                                dataset.borderColor = `rgba(${newRgb.r}, ${newRgb.g}, ${newRgb.b}, 1)`;
                            }
                            if (!dataset.backgroundColor) {
                                dataset.backgroundColor = `rgba(${newRgb.r}, ${newRgb.g}, ${newRgb.b}, 0.1)`;
                            }
                            if (!dataset.pointBackgroundColor) {
                                dataset.pointBackgroundColor = `rgba(${newRgb.r}, ${newRgb.g}, ${newRgb.b}, 1)`;
                            }
                            if (!dataset.pointBorderColor) {
                                dataset.pointBorderColor = `rgba(${newRgb.r}, ${newRgb.g}, ${newRgb.b}, 1)`;
                            }
                        }
                        
                        // Bar, bubble charts
                        else if (['bar', 'bubble'].includes(this.type)) {
                            if (!dataset.backgroundColor) {
                                dataset.backgroundColor = `rgba(${newRgb.r}, ${newRgb.g}, ${newRgb.b}, 0.8)`;
                            }
                            if (!dataset.borderColor) {
                                dataset.borderColor = `rgba(${newRgb.r}, ${newRgb.g}, ${newRgb.b}, 1)`;
                            }
                        }
                    }
                } else {
                    // Single dataset - use original color with opacity variations
                    // Line, radar, and scatter charts
                    if (['line', 'radar', 'scatter'].includes(this.type)) {
                        if (!dataset.borderColor) {
                            dataset.borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
                        }
                        if (!dataset.backgroundColor) {
                            dataset.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
                        }
                        if (!dataset.pointBackgroundColor) {
                            dataset.pointBackgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
                        }
                        if (!dataset.pointBorderColor) {
                            dataset.pointBorderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
                        }
                    }
                    
                    // Bar, bubble charts
                    else if (['bar', 'bubble'].includes(this.type)) {
                        if (!dataset.backgroundColor) {
                            dataset.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
                        }
                        if (!dataset.borderColor) {
                            dataset.borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
                        }
                    }
                }
                
                // Pie, doughnut, polarArea charts - need array of colors
                if (['pie', 'doughnut', 'polarArea'].includes(this.type)) {
                    if (!dataset.backgroundColor || !Array.isArray(dataset.backgroundColor)) {
                        dataset.backgroundColor = dataset.data.map((_, i) => {
                            const hueShift = (i * 30) % 360; // Shift hue for each segment
                            return this.adjustHue(rgb, hueShift, 0.8);
                        });
                    }
                    if (!dataset.borderColor) {
                        dataset.borderColor = '#fff'; // White borders for pie charts
                    }
                    if (!dataset.borderWidth) {
                        dataset.borderWidth = 2;
                    }
                }

                return dataset;
            });

            return data;
        },

        colorToRgb(color) {
            // Create a temporary element to compute the RGB value
            const temp = document.createElement('div');
            temp.style.color = color;
            document.body.appendChild(temp);
            const computedColor = window.getComputedStyle(temp).color;
            document.body.removeChild(temp);

            // Parse RGB values
            const match = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
                return {
                    r: parseInt(match[1]),
                    g: parseInt(match[2]),
                    b: parseInt(match[3])
                };
            }
            return null;
        },

        adjustHue(rgb, hueShift, opacity = 1) {
            // Convert RGB to HSL
            const r = rgb.r / 255;
            const g = rgb.g / 255;
            const b = rgb.b / 255;

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0; // achromatic
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                    case g: h = ((b - r) / d + 2) / 6; break;
                    case b: h = ((r - g) / d + 4) / 6; break;
                }
            }

            // Adjust hue
            h = (h * 360 + hueShift) % 360 / 360;

            // Convert back to RGB
            let r2, g2, b2;
            if (s === 0) {
                r2 = g2 = b2 = l; // achromatic
            } else {
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r2 = hue2rgb(p, q, h + 1/3);
                g2 = hue2rgb(p, q, h);
                b2 = hue2rgb(p, q, h - 1/3);
            }

            return `rgba(${Math.round(r2 * 255)}, ${Math.round(g2 * 255)}, ${Math.round(b2 * 255)}, ${opacity})`;
        },

        createChart() {
            if (!this.$refs.canvas) {
                this.error = 'Canvas element not found';
                return;
            }

            if (!this.hasValidData) {
                return;
            }

            try {
                const ctx = this.$refs.canvas.getContext('2d');

                // Destroy existing chart if any
                if (this.chart) {
                    this.destroy();
                }

                // Get currentColor from computed styles if enabled
                const currentColor = this.useCurrentColor ? this.getCurrentColor() : null;

                // Prepare data with currentColor defaults
                const preparedData = this.prepareDataWithDefaults(this.data, currentColor);

                // Create new chart with prepared data
                this.chart = new Chart(ctx, {
                    type: this.type,
                    data: preparedData,
                    options: this.getMergedOptions(this.options, currentColor),
                    plugins: this.plugins
                });

                this.error = null;
                this.loading = false;
                this.$emit('chart-created', this.chart);

                // Setup resize observer for better responsiveness
                this.setupResizeObserver();

            } catch (error) {
                this.handleError('Failed to create chart', error);
            }
        },

        recreateChart() {
            this.loading = true;
            this.destroy();
            this.$nextTick(() => {
                this.createChart();
            });
        },

        setupResizeObserver() {
            if (typeof ResizeObserver !== 'undefined' && this.$refs.canvas) {
                this.resizeObserver = new ResizeObserver(() => {
                    if (this.chart) {
                        this.chart.resize();
                    }
                });
                this.resizeObserver.observe(this.$refs.canvas.parentElement);
            }
        },

        update(duration) {
            if (this.chart) {
                try {
                    this.chart.update(duration !== undefined ? duration : this.updateMode);
                } catch (error) {
                    this.handleError('Failed to update chart', error);
                }
            }
        },

        reset() {
            if (this.chart) {
                try {
                    this.chart.reset();
                } catch (error) {
                    this.handleError('Failed to reset chart', error);
                }
            }
        },

        render() {
            if (this.chart) {
                try {
                    this.chart.render();
                } catch (error) {
                    this.handleError('Failed to render chart', error);
                }
            }
        },

        stop() {
            if (this.chart) {
                try {
                    this.chart.stop();
                } catch (error) {
                    this.handleError('Failed to stop chart animations', error);
                }
            }
        },

        getBase64Image(type = 'image/png', quality = 1.0) {
            if (this.chart && this.$refs.canvas) {
                try {
                    return this.$refs.canvas.toDataURL(type, quality);
                } catch (error) {
                    this.handleError('Failed to export chart as image', error);
                    return null;
                }
            }
            return null;
        },

        getDatasetAtEvent(event) {
            if (this.chart && event) {
                try {
                    return this.chart.getElementsAtEventForMode(
                        event,
                        'nearest',
                        { intersect: true },
                        false
                    );
                } catch (error) {
                    this.handleError('Failed to get dataset at event', error);
                    return [];
                }
            }
            return [];
        },

        getChart() {
            return this.chart;
        },

        destroy() {
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
                this.resizeObserver = null;
            }

            if (this.chart) {
                try {
                    this.chart.destroy();
                    this.chart = null;
                    this.$emit('chart-destroyed');
                } catch (error) {
                    this.handleError('Failed to destroy chart', error);
                }
            }
        },

        handleError(message, error) {
            this.error = message;
            this.loading = false;
            console.error(`[VueChart] ${message}:`, error);
            this.$emit('error', { message, error });
        }
    },

    mounted() {
        // Ensure Chart.js is loaded
        if (typeof Chart === 'undefined') {
            this.handleError('Chart.js is not loaded', new Error('Chart is not defined'));
            return;
        }

        this.$nextTick(() => {
            this.createChart();
        });
    },

    unmounted() {
        this.destroy();
    },

    template: /*html*/`
        <div class="vue-chart-container" :style="containerStyles">
            <app-loader v-if="loading && !error" class="kiss-flex kiss-flex-center kiss-flex-middle" style="position: absolute; inset: 0; z-index: 10;"></app-loader>
            <kiss-card v-if="error" class="kiss-color-danger kiss-padding" theme="contrast bordered">
                {{ error }}
            </kiss-card>
            <canvas v-show="!error && !loading" ref="canvas"></canvas>
        </div>
    `
}
