/**
 * CursorGlow Component — BOTPILOT AI
 * A global glowing orb that follows the cursor across the entire page.
 * Creates a dramatic, visible light effect with color-shifting
 * based on horizontal cursor position (blue → purple → cyan).
 */
import { useState, useEffect, useRef, useCallback } from 'react';

export default function CursorGlow() {
    const orbRef = useRef(null);
    const ringRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });
    const animRef = useRef(null);
    const [visible, setVisible] = useState(false);

    /* Color shifts based on horizontal cursor position */
    const getColor = useCallback((x) => {
        const w = window.innerWidth;
        const ratio = x / w;
        if (ratio < 0.33) {
            // Left third: blue → purple
            const t = ratio / 0.33;
            const r = Math.round(37 + (124 - 37) * t);
            const g = Math.round(99 + (58 - 99) * t);
            const b = Math.round(235 + (237 - 235) * t);
            return { r, g, b };
        } else if (ratio < 0.66) {
            // Middle third: purple → cyan
            const t = (ratio - 0.33) / 0.33;
            const r = Math.round(124 + (6 - 124) * t);
            const g = Math.round(58 + (182 - 58) * t);
            const b = Math.round(237 + (212 - 237) * t);
            return { r, g, b };
        } else {
            // Right third: cyan → blue
            const t = (ratio - 0.66) / 0.34;
            const r = Math.round(6 + (37 - 6) * t);
            const g = Math.round(182 + (99 - 182) * t);
            const b = Math.round(212 + (235 - 212) * t);
            return { r, g, b };
        }
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            target.current = { x: e.clientX, y: e.clientY };
            if (!visible) setVisible(true);
        };

        const handleMouseLeave = () => setVisible(false);
        const handleMouseEnter = () => setVisible(true);

        /* Smooth trailing animation */
        const animate = () => {
            pos.current.x += (target.current.x - pos.current.x) * 0.12;
            pos.current.y += (target.current.y - pos.current.y) * 0.12;

            if (orbRef.current) {
                const color = getColor(pos.current.x);
                orbRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
                orbRef.current.style.background = `radial-gradient(circle, rgba(${color.r},${color.g},${color.b},0.35) 0%, rgba(${color.r},${color.g},${color.b},0.12) 40%, transparent 70%)`;
                orbRef.current.style.boxShadow = `0 0 80px 30px rgba(${color.r},${color.g},${color.b},0.15), 0 0 200px 80px rgba(${color.r},${color.g},${color.b},0.06)`;
            }

            if (ringRef.current) {
                const ringX = pos.current.x + (target.current.x - pos.current.x) * 0.5;
                const ringY = pos.current.y + (target.current.y - pos.current.y) * 0.5;
                const color = getColor(ringX);
                ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
                ringRef.current.style.borderColor = `rgba(${color.r},${color.g},${color.b},0.25)`;
                ringRef.current.style.boxShadow = `0 0 20px rgba(${color.r},${color.g},${color.b},0.1), inset 0 0 20px rgba(${color.r},${color.g},${color.b},0.05)`;
            }

            animRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        animRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            cancelAnimationFrame(animRef.current);
        };
    }, [visible, getColor]);

    return (
        <>
            {/* Main glow orb */}
            <div
                ref={orbRef}
                className="cursor-glow-orb"
                style={{
                    opacity: visible ? 1 : 0,
                }}
            />
            {/* Trailing ring */}
            <div
                ref={ringRef}
                className="cursor-glow-ring"
                style={{
                    opacity: visible ? 1 : 0,
                }}
            />
        </>
    );
}
