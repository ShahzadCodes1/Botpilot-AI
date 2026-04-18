/**
 * FluidBackground Component — BOTPILOT AI
 * WebGL Fluid Simulation canvas that covers the entire page.
 * Creates colorful smoke/ink trails that follow the cursor
 * (exactly like thevelocitydigital.co).
 */
import { useEffect, useRef } from 'react';

export default function FluidBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        /* ── WebGL Setup ──────────────────────────── */
        const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
            || canvas.getContext('experimental-webgl', { alpha: true });
        if (!gl) return;

        // Extensions
        const extHalf = gl.getExtension('OES_texture_half_float');
        const extLinear = gl.getExtension('OES_texture_half_float_linear');
        const halfFloat = extHalf ? extHalf.HALF_FLOAT_OES : gl.UNSIGNED_BYTE;
        gl.getExtension('EXT_color_buffer_half_float');

        /* ── Config ───────────────────────────────── */
        const config = {
            SIM_RESOLUTION: 128,
            DYE_RESOLUTION: 512,
            DENSITY_DISSIPATION: 0.97,
            VELOCITY_DISSIPATION: 0.98,
            PRESSURE_ITERATIONS: 20,
            SPLAT_RADIUS: 0.5,
            SPLAT_FORCE: 8000,
            COLOR_UPDATE_SPEED: 10,
            BACK_COLOR: { r: 0, g: 0, b: 0 },
        };

        /* ── Helpers ──────────────────────────────── */
        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = canvas.clientWidth * dpr;
            canvas.height = canvas.clientHeight * dpr;
        }
        resize();

        function compileShader(type, source) {
            const s = gl.createShader(type);
            gl.shaderSource(s, source);
            gl.compileShader(s);
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(s));
                return null;
            }
            return s;
        }

        function createProgram(vsSource, fsSource) {
            const p = gl.createProgram();
            gl.attachShader(p, compileShader(gl.VERTEX_SHADER, vsSource));
            gl.attachShader(p, compileShader(gl.FRAGMENT_SHADER, fsSource));
            gl.linkProgram(p);
            if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
                console.error(gl.getProgramInfoLog(p));
            }
            const uniforms = {};
            const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < n; i++) {
                const info = gl.getActiveUniform(p, i);
                uniforms[info.name] = gl.getUniformLocation(p, info.name);
            }
            return { program: p, uniforms };
        }

        function createFBO(w, h, internalFormat, format, type, filter) {
            const tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
            gl.viewport(0, 0, w, h);
            gl.clear(gl.COLOR_BUFFER_BIT);
            return { texture: tex, fbo, width: w, height: h };
        }

        function createDoubleFBO(w, h, internalFormat, format, type, filter) {
            let f1 = createFBO(w, h, internalFormat, format, type, filter);
            let f2 = createFBO(w, h, internalFormat, format, type, filter);
            return {
                get read() { return f1; },
                get write() { return f2; },
                swap() { const t = f1; f1 = f2; f2 = t; },
            };
        }

        /* ── Shaders ──────────────────────────────── */
        const baseVS = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

        const splatFS = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main() {
        vec2 p = vUv - point;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p,p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

        const advectionFS = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      void main() {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
        gl_FragColor.a = 1.0;
      }
    `;

        const divergenceFS = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      void main() {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

        const pressureFS = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      void main() {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float div = texture2D(uDivergence, vUv).x;
        float p = (L + R + B + T - div) * 0.25;
        gl_FragColor = vec4(p, 0.0, 0.0, 1.0);
      }
    `;

        const gradientFS = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      void main() {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        vel.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(vel, 0.0, 1.0);
      }
    `;

        const displayFS = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main() {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
      }
    `;

        const clearFS = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;
      void main() {
        gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `;

        /* ── Build Programs ───────────────────────── */
        const splatProg = createProgram(baseVS, splatFS);
        const advProg = createProgram(baseVS, advectionFS);
        const divProg = createProgram(baseVS, divergenceFS);
        const presProg = createProgram(baseVS, pressureFS);
        const gradProg = createProgram(baseVS, gradientFS);
        const dispProg = createProgram(baseVS, displayFS);
        const clearProg = createProgram(baseVS, clearFS);

        /* ── Geometry ─────────────────────────────── */
        const quad = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quad);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        function blit(target) {
            gl.bindBuffer(gl.ARRAY_BUFFER, quad);
            const loc = 0;
            gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(loc);
            if (target) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
                gl.viewport(0, 0, target.width, target.height);
            } else {
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.viewport(0, 0, canvas.width, canvas.height);
            }
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }

        /* ── FBOs ─────────────────────────────────── */
        const texType = halfFloat;
        const filter = extLinear ? gl.LINEAR : gl.NEAREST;
        const simW = config.SIM_RESOLUTION;
        const simH = Math.round(simW * canvas.height / canvas.width);
        const dyeW = config.DYE_RESOLUTION;
        const dyeH = Math.round(dyeW * canvas.height / canvas.width);

        let velocity = createDoubleFBO(simW, simH, gl.RGBA, gl.RGBA, texType, filter);
        let dye = createDoubleFBO(dyeW, dyeH, gl.RGBA, gl.RGBA, texType, filter);
        let divergence = createFBO(simW, simH, gl.RGBA, gl.RGBA, texType, gl.NEAREST);
        let pressure = createDoubleFBO(simW, simH, gl.RGBA, gl.RGBA, texType, gl.NEAREST);

        /* ── Mouse / Pointer ─────────────────────── */
        let pointer = { x: 0, y: 0, dx: 0, dy: 0, down: false, moved: false };
        let lastPointer = { x: 0, y: 0 };

        function onPointerMove(e) {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            pointer.dx = (x - lastPointer.x) * 50;
            pointer.dy = (y - lastPointer.y) * 50;
            lastPointer.x = x;
            lastPointer.y = y;
            pointer.x = x;
            pointer.y = y;
            pointer.moved = true;
        }

        function onTouchMove(e) {
            e.preventDefault();
            const t = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const x = (t.clientX - rect.left) / rect.width;
            const y = 1.0 - (t.clientY - rect.top) / rect.height;
            pointer.dx = (x - lastPointer.x) * 40;
            pointer.dy = (y - lastPointer.y) * 40;
            lastPointer.x = x;
            lastPointer.y = y;
            pointer.x = x;
            pointer.y = y;
            pointer.moved = true;
        }

        window.addEventListener('mousemove', onPointerMove);
        canvas.addEventListener('touchmove', onTouchMove, { passive: false });

        /* ── Random Color ─────────────────────────── */
        let colorTimer = 0;
        let currentHue = Math.random() * 360;

        function HSVtoRGB(h, s, v) {
            const f = (n) => {
                const k = (n + h / 60) % 6;
                return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
            };
            return { r: f(5), g: f(3), b: f(1) };
        }

        function generateColor() {
            currentHue = (currentHue + 50 + Math.random() * 40) % 360;
            const c = HSVtoRGB(currentHue, 0.85, 1.0);
            return { r: c.r * 0.45, g: c.g * 0.45, b: c.b * 0.45 };
        }

        let splatColor = generateColor();

        /* ── Splat ────────────────────────────────── */
        function splat(x, y, dx, dy, color) {
            const aspect = canvas.width / canvas.height;

            gl.useProgram(splatProg.program);
            gl.uniform1i(splatProg.uniforms.uTarget, 0);
            gl.uniform1f(splatProg.uniforms.aspectRatio, aspect);
            gl.uniform2f(splatProg.uniforms.point, x, y);
            gl.uniform3f(splatProg.uniforms.color, dx, dy, 0);
            gl.uniform1f(splatProg.uniforms.radius, config.SPLAT_RADIUS / 100.0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            blit(velocity.write);
            velocity.swap();

            gl.uniform3f(splatProg.uniforms.color, color.r, color.g, color.b);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, dye.read.texture);
            blit(dye.write);
            dye.swap();
        }

        /* ── Random auto-splats for ambient effect ── */
        function randomSplat() {
            const color = generateColor();
            const x = Math.random();
            const y = Math.random();
            const dx = (Math.random() - 0.5) * 0.001;
            const dy = (Math.random() - 0.5) * 0.001;
            splat(x, y, dx * config.SPLAT_FORCE, dy * config.SPLAT_FORCE, color);
        }

        // Initial splats for instant visual impact
        for (let i = 0; i < 5; i++) randomSplat();
        // Periodic ambient splats for continuous ambient animation
        const ambientInterval = setInterval(() => { randomSplat(); }, 2500);

        /* ── Simulation Step ─────────────────────── */
        function step(dt) {
            // Advect velocity
            gl.useProgram(advProg.program);
            gl.uniform2f(advProg.uniforms.texelSize, 1.0 / simW, 1.0 / simH);
            gl.uniform1i(advProg.uniforms.uVelocity, 0);
            gl.uniform1i(advProg.uniforms.uSource, 0);
            gl.uniform1f(advProg.uniforms.dt, dt);
            gl.uniform1f(advProg.uniforms.dissipation, config.VELOCITY_DISSIPATION);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            blit(velocity.write);
            velocity.swap();

            // Advect dye
            gl.uniform1i(advProg.uniforms.uVelocity, 0);
            gl.uniform1i(advProg.uniforms.uSource, 1);
            gl.uniform1f(advProg.uniforms.dissipation, config.DENSITY_DISSIPATION);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, dye.read.texture);
            blit(dye.write);
            dye.swap();

            // Divergence
            gl.useProgram(divProg.program);
            gl.uniform2f(divProg.uniforms.texelSize, 1.0 / simW, 1.0 / simH);
            gl.uniform1i(divProg.uniforms.uVelocity, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            blit(divergence);

            // Clear pressure
            gl.useProgram(clearProg.program);
            gl.uniform1i(clearProg.uniforms.uTexture, 0);
            gl.uniform1f(clearProg.uniforms.value, 0.8);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
            blit(pressure.write);
            pressure.swap();

            // Pressure solve
            gl.useProgram(presProg.program);
            gl.uniform2f(presProg.uniforms.texelSize, 1.0 / simW, 1.0 / simH);
            gl.uniform1i(presProg.uniforms.uDivergence, 1);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, divergence.texture);
            for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
                gl.uniform1i(presProg.uniforms.uPressure, 0);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
                blit(pressure.write);
                pressure.swap();
            }

            // Gradient subtract
            gl.useProgram(gradProg.program);
            gl.uniform2f(gradProg.uniforms.texelSize, 1.0 / simW, 1.0 / simH);
            gl.uniform1i(gradProg.uniforms.uPressure, 0);
            gl.uniform1i(gradProg.uniforms.uVelocity, 1);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            blit(velocity.write);
            velocity.swap();
        }

        /* ── Render Loop ──────────────────────────── */
        let lastTime = Date.now();
        let animId;

        function animate() {
            const now = Date.now();
            let dt = Math.min((now - lastTime) / 1000, 0.016);
            lastTime = now;

            // Color cycling
            colorTimer += dt * config.COLOR_UPDATE_SPEED;
            if (colorTimer >= 1) {
                colorTimer = 0;
                splatColor = generateColor();
            }

            // Apply pointer movement
            if (pointer.moved) {
                pointer.moved = false;
                const dx = pointer.dx * config.SPLAT_FORCE;
                const dy = pointer.dy * config.SPLAT_FORCE;
                splat(pointer.x, pointer.y, dx, dy, splatColor);
            }

            step(dt);

            // Render to screen
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.BLEND);
            gl.useProgram(dispProg.program);
            gl.uniform1i(dispProg.uniforms.uTexture, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, dye.read.texture);
            blit(null);
            gl.disable(gl.BLEND);

            animId = requestAnimationFrame(animate);
        }

        animate();

        /* ── Resize handler ───────────────────────── */
        function handleResize() {
            resize();
        }
        window.addEventListener('resize', handleResize);

        /* ── Cleanup ──────────────────────────────── */
        return () => {
            cancelAnimationFrame(animId);
            clearInterval(ambientInterval);
            window.removeEventListener('mousemove', onPointerMove);
            canvas.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fluid-canvas"
        />
    );
}
