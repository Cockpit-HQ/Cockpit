# Vue Chart.js Component

A Vue 3 component wrapper for Chart.js, designed for use in Cockpit CMS.

## Installation

The component is already included in Cockpit at:
```
/modules/App/assets/vendor/chartjs/vue-chart.js
```

## Basic Usage

```javascript
import VueChart from '/modules/App/assets/vendor/chartjs/vue-chart.js';

export default {
    components: {
        'vue-chart': VueChart
    },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [{
                    label: 'Sales 2024',
                    data: [12, 19, 3, 5, 2],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                }]
            }
        }
    },
    template: `
        <vue-chart 
            type="line"
            :data="chartData"
            height="400px"
        />
    `
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | String | `'line'` | Chart type: 'line', 'bar', 'radar', 'doughnut', 'pie', 'polarArea', 'bubble', 'scatter' |
| `data` | Object | Required | Chart.js data object with labels and datasets |
| `options` | Object | `{}` | Chart.js options to override defaults |
| `height` | String | `'300px'` | Height of the chart container |
| `width` | String | `'100%'` | Width of the chart container |
| `plugins` | Array | `[]` | Array of Chart.js plugins |
| `updateMode` | String | `'none'` | Update animation mode: 'none', 'hide', 'show', 'default', 'active', 'resize', 'reset' |
| `useCurrentColor` | Boolean | `true` | Automatically use CSS currentColor for chart colors |

## Examples

### Line Chart

```javascript
{
    data() {
        return {
            lineData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue',
                    data: [65, 59, 80, 81, 56, 55],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        }
    },
    template: `
        <vue-chart 
            type="line"
            :data="lineData"
            height="300px"
        />
    `
}
```

### Bar Chart

```javascript
{
    data() {
        return {
            barData: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            barOptions: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    },
    template: `
        <vue-chart 
            type="bar"
            :data="barData"
            :options="barOptions"
            height="400px"
        />
    `
}
```

### Doughnut Chart

```javascript
{
    data() {
        return {
            doughnutData: {
                labels: ['Desktop', 'Mobile', 'Tablet'],
                datasets: [{
                    data: [300, 150, 100],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ]
                }]
            }
        }
    },
    template: `
        <vue-chart 
            type="doughnut"
            :data="doughnutData"
            height="300px"
            width="300px"
        />
    `
}
```

### Multiple Datasets

```javascript
{
    data() {
        return {
            multiData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [
                    {
                        label: 'Sales',
                        data: [65, 59, 80, 81, 56],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)'
                    },
                    {
                        label: 'Costs',
                        data: [28, 48, 40, 19, 86],
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)'
                    }
                ]
            }
        }
    },
    template: `
        <vue-chart 
            type="line"
            :data="multiData"
            height="350px"
        />
    `
}
```

## Custom Options

```javascript
{
    data() {
        return {
            chartData: {
                // ... your data
            },
            customOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Monthly Sales Report',
                        font: {
                            size: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', { 
                                        style: 'currency', 
                                        currency: 'USD' 
                                    }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value, index, values) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        }
    },
    template: `
        <vue-chart 
            type="bar"
            :data="chartData"
            :options="customOptions"
            height="400px"
        />
    `
}
```

## Methods

You can access the chart instance methods by using a ref:

```javascript
{
    mounted() {
        // Access the chart instance
        const chartComponent = this.$refs.myChart;
        
        // Update the chart (with optional duration in ms)
        chartComponent.update(750);
        
        // Reset the chart
        chartComponent.reset();
        
        // Stop animations
        chartComponent.stop();
        
        // Force render
        chartComponent.render();
        
        // Get base64 image (type and quality optional)
        const image = chartComponent.getBase64Image('image/png', 1.0);
        
        // Get elements at event position
        const elements = chartComponent.getDatasetAtEvent(event);
        
        // Destroy the chart
        chartComponent.destroy();
    },
    template: `
        <vue-chart 
            ref="myChart"
            type="line"
            :data="chartData"
        />
    `
}
```

## Events

The component emits the following events:

| Event | Payload | Description |
|-------|---------|-------------|
| `chart-created` | Chart instance | Emitted when chart is successfully created |
| `chart-destroyed` | None | Emitted when chart is destroyed |
| `error` | `{message, error}` | Emitted when an error occurs |

```javascript
<vue-chart 
    :data="chartData"
    @chart-created="onChartCreated"
    @chart-destroyed="onChartDestroyed"
    @error="onError"
/>
```

## Reactive Updates

The chart automatically updates when the data or options change:

```javascript
{
    data() {
        return {
            chartData: {
                labels: ['A', 'B', 'C'],
                datasets: [{
                    label: 'Dataset',
                    data: [1, 2, 3]
                }]
            }
        }
    },
    methods: {
        addDataPoint() {
            this.chartData.labels.push('D');
            this.chartData.datasets[0].data.push(4);
            // Chart updates automatically
        },
        updateData() {
            this.chartData.datasets[0].data = [5, 4, 3];
            // Chart updates automatically
        }
    },
    template: `
        <div>
            <vue-chart 
                type="bar"
                :data="chartData"
                height="300px"
            />
            <button @click="addDataPoint">Add Point</button>
            <button @click="updateData">Update Data</button>
        </div>
    `
}
```

## Using with Cockpit APIs

Example fetching data from Cockpit:

```javascript
{
    data() {
        return {
            loading: true,
            chartData: {
                labels: [],
                datasets: [{
                    label: 'Asset Count by Category',
                    data: [],
                    backgroundColor: []
                }]
            }
        }
    },
    mounted() {
        this.loadChartData();
    },
    methods: {
        async loadChartData() {
            try {
                // Fetch categories
                const response = await App.request('/itassets/settings/categories/load');
                const categories = response.items;
                
                // Build chart data
                this.chartData.labels = categories.map(cat => cat.name);
                this.chartData.datasets[0].data = categories.map(cat => cat.asset_count || 0);
                this.chartData.datasets[0].backgroundColor = categories.map(cat => 
                    cat.color || `hsl(${Math.random() * 360}, 70%, 50%)`
                );
                
                this.loading = false;
            } catch (error) {
                App.ui.notify('Failed to load chart data', 'error');
                this.loading = false;
            }
        }
    },
    template: `
        <div>
            <app-loader v-if="loading" />
            <vue-chart 
                v-else
                type="doughnut"
                :data="chartData"
                height="400px"
            />
        </div>
    `
}
```

## Default Options

The component includes sensible defaults that can be overridden:

```javascript
{
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
}
```

## Chart.js Plugins

You can use Chart.js plugins:

```javascript
{
    data() {
        return {
            plugins: [{
                id: 'custom-plugin',
                beforeDraw: (chart) => {
                    // Custom drawing logic
                }
            }]
        }
    },
    template: `
        <vue-chart 
            type="line"
            :data="chartData"
            :plugins="plugins"
        />
    `
}
```

## Styling

The chart container can be styled using standard CSS:

```css
.vue-chart-container {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border-radius: 8px;
    padding: 20px;
    background: white;
}
```

## Production Features

### Automatic Color Theming
By default, the component automatically uses the CSS `currentColor` from its container:
- Line/bar colors inherit from text color
- Grid lines use 20% opacity of text color
- Pie/doughnut charts generate hue variations
- Works seamlessly with dark/light themes

```javascript
// Disable automatic colors
<vue-chart 
    :data="chartData"
    :use-current-color="false"
/>

// Or style the container
<div style="color: #6366f1;">
    <vue-chart :data="chartData" />
</div>
```

### Error Handling
- Built-in data validation with helpful error messages
- Graceful error handling with visual feedback
- Console logging for debugging
- Error events for custom handling

### Performance Optimizations
- ResizeObserver for efficient responsive behavior
- Deep cloning to prevent data mutation
- Efficient update modes
- Proper cleanup on unmount

### Data Validation
The component validates:
- Data structure (must have labels and datasets arrays)
- Dataset structure (each must have a data array)
- Chart type validity
- Props types and values

### Memory Management
- Automatic chart destruction on unmount
- ResizeObserver cleanup
- Event listener cleanup
- No memory leaks

## Tips

1. **Performance**: For large datasets, disable animations:
   ```javascript
   options: {
       animation: {
           duration: 0
       }
   }
   // Or use updateMode prop
   <vue-chart :data="data" update-mode="none" />
   ```

2. **Responsive**: The chart is responsive by default. Control aspect ratio with:
   ```javascript
   options: {
       aspectRatio: 2 // width/height ratio
   }
   ```

3. **Dark Mode**: Adapt colors for dark themes:
   ```javascript
   options: {
       plugins: {
           legend: {
               labels: {
                   color: isDarkMode ? '#fff' : '#666'
               }
           }
       },
       scales: {
           x: {
               ticks: {
                   color: isDarkMode ? '#fff' : '#666'
               }
           }
       }
   }
   ```

4. **Error Handling**: Always handle errors in production:
   ```javascript
   <vue-chart 
       :data="chartData"
       @error="handleChartError"
   />
   
   methods: {
       handleChartError({ message, error }) {
           console.error('Chart error:', message, error);
           // Show user-friendly message
           this.$ui.notify('Failed to render chart', 'error');
       }
   }
   ```

## Browser Support

Works in all modern browsers that support:
- Vue 3
- Chart.js 4.x
- ES6+ features

## License

This component is part of Cockpit CMS and follows the same license terms.