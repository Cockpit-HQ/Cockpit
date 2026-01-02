/**
 * FLUX ANIMATION BACKGROUND - CUSTOM ELEMENT
 * A dependency-free WebGL particle system.
 */
class BgFluxAnimation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // State
        this.gl = null;
        this.program = null;
        this.animationId = null;
        this.resizeObserver = null;
        this.intersectionObserver = null;
        this.themeMedia = null;
        this.handleThemeChange = null;
        this.buffers = {}; // Track buffers for cleanup
        
        // Default to true to ensure initial render, observer will correct if off-screen
        this.isVisible = true; 
        
        this.time = 0;
        this.shockwaveTime = -100.0;
        
        this.particleCount = 30000;
        
        // Interaction State
        this.mouse = { x: 10000, y: 10000, wx: 10000, wy: 10000 };
        this.lastMouse = { x: 10000, y: 10000 };
        this.mouseVel = { x: 0, y: 0 };
        this.smoothVel = { x: 0, y: 0 };
        
        // Camera
        this.cameraPos = [0, 0, 110];
        this.viewMatrix = new Float32Array(16);
        this.projectionMatrix = new Float32Array(16);

        // Default Palette (Dark Mode)
        this.defaultPaletteDark = [
            [1.0, 0.6, 0.0], [1.0, 0.0, 0.3], [1.0, 0.92, 0.0], 
            [1.0, 0.2, 0.0], [1.0, 0.33, 0.0]
        ];
        // Default Palette (Light Mode / Lava Lamp Style)
        // darker, richer colors to stand out on white
        this.defaultPaletteLight = [
            [0.8, 0.2, 0.0], [0.6, 0.0, 0.2], [0.9, 0.4, 0.0],
            [0.7, 0.1, 0.0], [0.5, 0.0, 0.0]
        ];
        
        this.currentPalette = this.defaultPaletteDark;
        this.colorBuffer = null;
        this.isLightMode = false;
        this.rawColorValue = null; // Store raw input for re-generation
    }

    static get observedAttributes() {
        return ['colors', 'blending', 'particle-count'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'colors') {
            this.updatePaletteFromAttribute(newValue);
        } else if (name === 'blending') {
            this.updateBlending(newValue);
        } else if (name === 'particle-count') {
            this.updateParticleCount(newValue);
        }
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                    display: block;
                    overflow: hidden;
                }
                canvas {
                    display: block;
                    width: 100%;
                    height: 100%;
                    outline: none;
                }
                .glow {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none;
                    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 75%);
                    mix-blend-mode: screen; opacity: 0.9;
                    transition: opacity 0.3s;
                }
            </style>
            <canvas></canvas>
            <div class="glow"></div>
        `;

        this.canvas = this.shadowRoot.querySelector('canvas');
        
        // Initial check for colors before WebGL init
        if (this.hasAttribute('colors')) {
            this.updatePaletteFromAttribute(this.getAttribute('colors'), false);
        }

        this.initWebGL();
        this.bindEvents();
        
        // --- Blending Mode Logic ---
        this.handleThemeChange = (e) => {
            if (!this.hasAttribute('blending')) {
                const isDark = e.matches;
                this.updateBlending(isDark ? 'additive' : 'normal');
            }
        };

        if (this.hasAttribute('blending')) {
            this.updateBlending(this.getAttribute('blending'));
        } else {
            const media = window.matchMedia('(prefers-color-scheme: dark)');
            this.handleThemeChange(media); 
            media.addEventListener('change', this.handleThemeChange);
            this.themeMedia = media;
        }
        
        this.animate = this.animate.bind(this);
        this.animate();
    }

    disconnectedCallback() {
        this.stopAnimation();
        if (this.resizeObserver) this.resizeObserver.disconnect();
        if (this.intersectionObserver) this.intersectionObserver.disconnect();
        if (this.themeMedia && this.handleThemeChange) {
            this.themeMedia.removeEventListener('change', this.handleThemeChange);
        }
    }

    bindEvents() {
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(this);

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isVisible = true;
                    this.startAnimation();
                } else {
                    this.isVisible = false;
                    this.stopAnimation();
                }
            });
        });
        this.intersectionObserver.observe(this);

        this.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        });

        this.addEventListener('mouseleave', () => {
            this.mouse.x = 10000;
            this.mouseVel.x = 0; 
            this.mouseVel.y = 0;
            this.lastMouse.x = 10000;
        });

        this.addEventListener('click', () => {
            this.shockwaveTime = this.time;
        });
    }

    startAnimation() {
        if (!this.animationId && this.gl) {
            this.animate();
        }
    }

    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resize() {
        if (!this.gl) return;
        const width = this.clientWidth;
        const height = this.clientHeight;
        const dpr = Math.min(window.devicePixelRatio, 1.5);
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.uniform1f(this.locs.pixelRatio, dpr);
    }

    updateBlending(mode) {
        if (!this.gl) return;
        
        const prevMode = this.isLightMode;
        this.isLightMode = (mode === 'normal');
        
        const gl = this.gl;
        const glow = this.shadowRoot.querySelector('.glow');
        
        // Update Uniform
        if (this.locs && this.locs.isNormalBlend) {
                gl.uniform1f(this.locs.isNormalBlend, this.isLightMode ? 1.0 : 0.0);
        }

        // Update GL State
        if (this.isLightMode) {
            // Standard Transparency for Light Mode "Lava Lamp" look
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            if (glow) {
                glow.style.mixBlendMode = 'normal';
                glow.style.opacity = '0.0'; 
            }
        } else {
            // Additive for Dark Mode "Fire" look
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            if (glow) {
                glow.style.mixBlendMode = 'screen';
                glow.style.opacity = '0.9';
            }
        }

        // Regenerate palette if mode changed, to fix colors
        if (prevMode !== this.isLightMode) {
            this.updatePaletteFromAttribute(this.rawColorValue); 
        }
    }

    updateParticleCount(val) {
        const count = parseInt(val);
        if (count && count > 0 && count !== this.particleCount) {
            this.particleCount = count;
            if (this.gl && this.program) {
                this.initParticles();
            }
        }
    }

    // --- Color Utilities ---

    hexToRgb(hex) {
        hex = hex.trim();
        if (hex.startsWith('#')) hex = hex.slice(1);
        if (hex.length === 3) hex = hex[0]+hex[0] + hex[1]+hex[1] + hex[2]+hex[2];
        const bigint = parseInt(hex, 16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255].map(x => x / 255);
    }

    rgbToHsl(r, g, b) {
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; 
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h, s, l];
    }

    hslToRgb(h, s, l) {
        let r, g, b;
        if (s === 0) {
            r = g = b = l; 
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
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return [r, g, b];
    }

    generatePaletteFromAccent(baseColorHex) {
        const baseRgb = this.hexToRgb(baseColorHex);
        const [h, s, l] = this.rgbToHsl(...baseRgb);
        
        if (this.isLightMode) {
            // Light Mode: Rich, Saturated Colors (Lava Lamp Style)
            // We keep lightness lower (0.4-0.6) so it shows up on white
            // We boost saturation to make it pop
            return [
                this.hslToRgb(h, s, 0.7),                            // Lightest
                this.hslToRgb(h, Math.min(1, s + 0.1), 0.5),         // Base
                this.hslToRgb(h, Math.min(1, s + 0.3), 0.4),         // Vibrant/Mid
                this.hslToRgb((h - 0.05) % 1, s, 0.3),               // Deep
                this.hslToRgb((h + 0.05) % 1, Math.min(1, s+0.2), 0.35) // Accent
            ];
        } else {
            // Dark Mode: Standard Glowing Gradient
            return [
                this.hslToRgb(h, s, Math.max(0, l * 0.4)),           
                this.hslToRgb(h, s, l),                              
                this.hslToRgb(h, Math.min(1, s + 0.2), l),           
                this.hslToRgb((h + 0.05) % 1, s, Math.min(1, l * 1.3)), 
                this.hslToRgb((h + 0.1) % 1, Math.max(0, s * 0.5), 0.95) 
            ];
        }
    }

    updatePaletteFromAttribute(attrValue, updateBuffer = true) {
        this.rawColorValue = attrValue; 
        
        if (!attrValue) {
            this.currentPalette = this.isLightMode ? this.defaultPaletteLight : this.defaultPaletteDark;
        } else {
            try {
                const rawList = attrValue.split(',').filter(s => s.trim());
                const resolveColor = (str) => {
                    str = str.trim();
                    if (str.startsWith('var(')) str = str.replace(/^var\((--[^)]+)\)$/, '$1');
                    if (str.startsWith('--')) {
                        const val = getComputedStyle(this).getPropertyValue(str).trim();
                        return val || str;
                    }
                    return str;
                };
                const resolvedList = rawList.map(resolveColor);
                
                if (resolvedList.length === 1) {
                    this.currentPalette = this.generatePaletteFromAccent(resolvedList[0]);
                } else {
                    this.currentPalette = resolvedList.map(c => this.hexToRgb(c));
                }
            } catch (e) {
                this.currentPalette = this.isLightMode ? this.defaultPaletteLight : this.defaultPaletteDark;
            }
        }
        if (updateBuffer && this.gl && this.colorBuffer) {
            this.regenerateColorBuffer();
        }
    }

    regenerateColorBuffer() {
        const colors = new Float32Array(this.particleCount * 3);
        const palette = this.currentPalette;

        for (let i = 0; i < this.particleCount; i++) {
            const t = i / this.particleCount;
            const i3 = i * 3;

            const colorT = t * (palette.length - 1);
            const idx = Math.floor(colorT);
            const mix = colorT - idx;
            const c1 = palette[idx];
            const c2 = palette[Math.min(idx + 1, palette.length - 1)];
            const brightness = 0.8 + Math.random() * 0.4;
            
            // Color mixing
            colors[i3] = (c1[0] + (c2[0]-c1[0])*mix) * brightness;
            colors[i3+1] = (c1[1] + (c2[1]-c1[1])*mix) * brightness;
            colors[i3+2] = (c1[2] + (c2[2]-c1[2])*mix) * brightness;
        }

        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    }

    initParticles() {
        if (!this.gl || !this.program) return;
        const gl = this.gl;

        if (this.buffers) {
            if (this.buffers.pos) gl.deleteBuffer(this.buffers.pos);
            if (this.buffers.size) gl.deleteBuffer(this.buffers.size);
            if (this.buffers.angle) gl.deleteBuffer(this.buffers.angle);
            if (this.buffers.random) gl.deleteBuffer(this.buffers.random);
            if (this.buffers.color) gl.deleteBuffer(this.buffers.color);
        }
        this.buffers = {};

        const positions = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        const angles = new Float32Array(this.particleCount);
        const randomFactors = new Float32Array(this.particleCount);

        const goldenAngle = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < this.particleCount; i++) {
            const t = i / this.particleCount;
            const angle = i * goldenAngle;
            
            const baseRadius = 65;
            const spiralTwist = 6;
            const pulse = Math.sin(t * Math.PI * 2 + 0.8);
            const radius = baseRadius * Math.sqrt(t) * (1 + 0.3 * pulse);
            
            const pos = {
                x: radius * Math.cos(angle + t * spiralTwist),
                y: radius * Math.sin(angle + t * spiralTwist),
                z: radius * Math.sin(t * 8 + 0.8) * 0.8
            };

            const i3 = i * 3;
            positions[i3] = pos.x; positions[i3+1] = pos.y; positions[i3+2] = pos.z;
            angles[i] = angle;
            sizes[i] = 1.0 * (1.1 - t * 0.3) * (0.6 + Math.random() * 0.7);
            randomFactors[i] = Math.random();
        }

        const createBuffer = (data, name, size) => {
            const buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            const loc = gl.getAttribLocation(this.program, name);
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
            return buf;
        };

        this.buffers.pos = createBuffer(positions, 'a_originalPos', 3);
        this.buffers.size = createBuffer(sizes, 'a_size', 1);
        this.buffers.angle = createBuffer(angles, 'a_angle', 1);
        this.buffers.random = createBuffer(randomFactors, 'a_randomFactor', 1);
        
        this.colorBuffer = gl.createBuffer();
        this.buffers.color = this.colorBuffer; 
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.particleCount * 3 * 4, gl.STATIC_DRAW);
        const colLoc = gl.getAttribLocation(this.program, 'a_color');
        gl.enableVertexAttribArray(colLoc);
        gl.vertexAttribPointer(colLoc, 3, gl.FLOAT, false, 0, 0);
        
        this.regenerateColorBuffer();
    }

    initWebGL() {
        this.gl = this.canvas.getContext('webgl', { 
            antialias: true, 
            alpha: true 
        });

        if (!this.gl) {
            this.shadowRoot.innerHTML = '<div style="color:red; padding:20px;">WebGL not supported</div>';
            return;
        }

        const gl = this.gl;

        const vsSource = `
            attribute vec3 a_originalPos;
            attribute vec3 a_color;
            attribute float a_size;
            attribute float a_angle;
            attribute float a_randomFactor;

            uniform mat4 u_viewMatrix;
            uniform mat4 u_projectionMatrix;
            uniform float u_time;
            uniform float u_shockwaveTime;
            uniform vec3 u_mousePos;
            uniform vec3 u_mouseVel;
            uniform float u_pixelRatio;

            varying vec3 vColor;
            varying float vIntensity;
            varying float vRandomFactor;

            void main() {
                vColor = a_color;
                vRandomFactor = a_randomFactor;
                
                float morphTime = u_time * 0.5;
                float pattern1 = sin(a_angle * 5.0 + morphTime) * cos(a_angle * 2.0);
                float pattern2 = cos(a_angle * 4.0 - morphTime) * sin(a_angle * 3.0);
                float blend = sin(morphTime * 0.6) * 0.5 + 0.5;
                float displacement = mix(pattern1, pattern2, blend);

                vec3 normOrig = normalize(a_originalPos + vec3(0.001));
                vec3 animatedPos = a_originalPos + normOrig * displacement * 6.0;
                vec3 pos = animatedPos;

                float waveAge = u_time - u_shockwaveTime;
                float waveSpeed = 60.0;

                if (waveAge > 0.0 && waveAge < 3.0) {
                    float distFromCenter = length(a_originalPos.xy);
                    float currentRadius = waveAge * waveSpeed;
                    float waveWidth = 20.0;
                    float diff = distFromCenter - currentRadius;

                    if (abs(diff) < waveWidth) {
                        float rippleShape = cos(diff * 0.25) * 0.5 + 0.5;
                        float decay = 1.0 - smoothstep(0.0, 3.0, waveAge);
                        pos.z += rippleShape * 20.0 * decay;
                        pos.xy += normalize(pos.xy) * rippleShape * 5.0 * decay;
                        vColor += vec3(0.5, 0.5, 0.5) * rippleShape * decay;
                    }
                }

                vec3 toMouse = u_mousePos - pos;
                float dist = length(toMouse);
                float influence = pow(smoothstep(45.0, 5.0, dist), 2.0);
                vIntensity = 0.0;

                if (influence > 0.001) {
                    float velMag = length(u_mouseVel);
                    float velInfluence = smoothstep(0.1, 2.0, velMag) * influence;
                    vec3 forceDir = normalize(u_mouseVel + vec3(0.001));
                    vec3 pushDir = normalize(pos - u_mousePos);
                    vec3 dir = normalize(mix(forceDir, pushDir, 0.3));
                    
                    float dispMag = velInfluence * (5.0 + a_randomFactor * 6.0);
                    pos += dir * dispMag;
                    vIntensity = clamp(influence * 0.6 + velInfluence * 0.9, 0.0, 1.0);
                }

                pos += (animatedPos - pos) * 0.01;
                float breath = sin(u_time * 1.3 + a_angle) * 0.08;
                pos *= 1.0 + breath * (1.0 - influence * 0.7) * (0.6 + vRandomFactor * 0.7);

                vec4 mvPos = u_viewMatrix * vec4(pos, 1.0);
                gl_Position = u_projectionMatrix * mvPos;

                float sizeFactor = 1.0 + vIntensity * 0.3;
                float perspective = 500.0 / -mvPos.z; 
                gl_PointSize = a_size * sizeFactor * perspective * u_pixelRatio;
            }
        `;

        const fsSource = `
            precision highp float;
            uniform float u_time;
            uniform float u_isNormalBlend;
            varying vec3 vColor;
            varying float vIntensity;
            varying float vRandomFactor;

            void main() {
                vec2 pc = gl_PointCoord * 2.0 - 1.0;
                float dist = length(pc);
                if (dist > 1.0) discard;

                // Unified Soft Shape Logic for both modes
                float core = smoothstep(0.2, 0.0, dist) * 0.6;
                float glow = exp(-dist * 2.4) * 0.7;
                float darkShape = core + glow;
                
                // Sharper circle for light mode to avoid white halo
                // Increased radius from 0.5 to 0.9 to make particles larger
                float lightShape = smoothstep(0.9, 0.0, dist); 

                // Mix shapes
                float shape = mix(darkShape, lightShape, u_isNormalBlend);

                // Dynamic highlight: White for dark mode, Black for light mode
                vec3 highlight = mix(vec3(1.0), vec3(0.0), u_isNormalBlend);
                vec3 finalColor = mix(vColor, highlight, vIntensity * 0.6);
                
                float shimmer = 1.0 + sin((u_time * 60.0 + vRandomFactor * 150.0) * (0.7 + vIntensity * 0.3)) * 0.15 * (1.0 - dist * 0.5);
                
                // Boost alpha slightly in light mode to ensure visibility
                float alphaBoost = 1.0 + u_isNormalBlend * 1.5; 
                float baseAlpha = shape * clamp(0.3 + vIntensity * 0.6, 0.0, 1.0) * alphaBoost;
                
                gl_FragColor = vec4(finalColor, baseAlpha * shimmer);
            }
        `;

        const createShader = (type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("Shader Error:", gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        gl.useProgram(this.program);

        // Separate buffers init to allow re-initialization
        this.initParticles();

        this.locs = {
            view: gl.getUniformLocation(this.program, 'u_viewMatrix'),
            proj: gl.getUniformLocation(this.program, 'u_projectionMatrix'),
            time: gl.getUniformLocation(this.program, 'u_time'),
            shockwave: gl.getUniformLocation(this.program, 'u_shockwaveTime'),
            mousePos: gl.getUniformLocation(this.program, 'u_mousePos'),
            mouseVel: gl.getUniformLocation(this.program, 'u_mouseVel'),
            pixelRatio: gl.getUniformLocation(this.program, 'u_pixelRatio'),
            isNormalBlend: gl.getUniformLocation(this.program, 'u_isNormalBlend')
        };

        this.resize();

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.depthMask(false);
    }

    updateMouseRay() {
        if (this.mouse.x > 9000) return;

        const cx = Math.sin(this.time * 0.3) * 12;
        const cy = Math.cos(this.time * 0.4) * 12;
        const cz = (this.clientWidth < 800) ? 140 : 110;

        const fovScale = Math.tan(60 * Math.PI / 360); 
        const aspect = this.canvas.width / this.canvas.height; 

        const vY = this.mouse.y * fovScale; 
        const vX = this.mouse.x * fovScale * aspect; 
        const vZ = -1;

        const m = this.viewMatrix;
        const dx = vX * m[0] + vY * m[4] + vZ * m[8];
        const dy = vX * m[1] + vY * m[5] + vZ * m[9];
        const dz = vX * m[2] + vY * m[6] + vZ * m[10];

        if (Math.abs(dz) > 0.001) {
            const t = -cz / dz;
            this.mouse.wx = cx + dx * t;
            this.mouse.wy = cy + dy * t;

            if (this.lastMouse.x < 9000) {
                this.mouseVel.x = this.mouse.wx - this.lastMouse.x;
                this.mouseVel.y = this.mouse.wy - this.lastMouse.y;
            }
            this.lastMouse.x = this.mouse.wx;
            this.lastMouse.y = this.mouse.wy;
        }
    }

    animate() {
        if (!this.isVisible || !this.gl) return;
        
        this.animationId = requestAnimationFrame(this.animate);
        this.time = performance.now() * 0.0007;

        const gl = this.gl;

        this.cameraPos[0] = Math.sin(this.time * 0.3) * 12;
        this.cameraPos[1] = Math.cos(this.time * 0.4) * 12;
        this.cameraPos[2] = (this.clientWidth < 800) ? 140 : 110;

        FluxMath.perspective(this.projectionMatrix, 60 * Math.PI / 180, this.canvas.width / this.canvas.height, 1, 1000);
        FluxMath.lookAt(this.viewMatrix, this.cameraPos, [0,0,0], [0,1,0]);

        this.updateMouseRay();
        
        this.smoothVel.x += (this.mouseVel.x - this.smoothVel.x) * 0.15;
        this.smoothVel.y += (this.mouseVel.y - this.smoothVel.y) * 0.15;
        this.mouseVel.x *= 0.92;
        this.mouseVel.y *= 0.92;

        gl.uniformMatrix4fv(this.locs.view, false, this.viewMatrix);
        gl.uniformMatrix4fv(this.locs.proj, false, this.projectionMatrix);
        gl.uniform1f(this.locs.time, this.time);
        gl.uniform1f(this.locs.shockwave, this.shockwaveTime);
        gl.uniform3f(this.locs.mousePos, this.mouse.wx, this.mouse.wy, 0);
        gl.uniform3f(this.locs.mouseVel, this.smoothVel.x, this.smoothVel.y, 0);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, this.particleCount);
    }
}

const FluxMath = {
    perspective: (out, fovy, aspect, near, far) => {
        const f = 1.0 / Math.tan(fovy / 2);
        const nf = 1 / (near - far);
        out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0;
        out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0;
        out[8] = 0; out[9] = 0; out[10] = (far + near) * nf; out[11] = -1;
        out[12] = 0; out[13] = 0; out[14] = (2 * far * near) * nf; out[15] = 0;
    },
    lookAt: (out, eye, center, up) => {
        let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
        let eyex = eye[0], eyey = eye[1], eyez = eye[2];
        let upx = up[0], upy = up[1], upz = up[2];
        let centerx = center[0], centery = center[1], centerz = center[2];

        z0 = eyex - centerx; z1 = eyey - centery; z2 = eyez - centerz;
        len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len; z1 *= len; z2 *= len;

        x0 = upy * z2 - upz * z1; x1 = upz * z0 - upx * z2; x2 = upx * z1 - upy * z0;
        len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!len) { x0 = 0; x1 = 0; x2 = 0; } else { len = 1 / len; x0 *= len; x1 *= len; x2 *= len; }

        y0 = z1 * x2 - z2 * x1; y1 = z2 * x0 - z0 * x2; y2 = z0 * x1 - z1 * x0;
        len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!len) { y0 = 0; y1 = 0; y2 = 0; } else { len = 1 / len; y0 *= len; y1 *= len; y2 *= len; }

        out[0] = x0; out[1] = y0; out[2] = z0; out[3] = 0;
        out[4] = x1; out[5] = y1; out[6] = z1; out[7] = 0;
        out[8] = x2; out[9] = y2; out[10] = z2; out[11] = 0;
        out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        out[15] = 1;
    }
};

customElements.define('bg-fluxanimation', BgFluxAnimation);