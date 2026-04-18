/**
 * Intro Component — BOTPILOT AI
 * Velocity-style "Meet Us" section placed directly below the hero slider.
 *
 * Layout (mirrors the screenshot exactly):
 *   LEFT  — eyebrow line · giant brand name · left-aligned sub-heading
 *           · body copy · CTA button
 *   RIGHT — animated logo mark / brand visual
 *
 * Colours: #091060 navy · #000 black · #06b6d4 cyan accent
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

export default function Intro() {
  const sectionRef = useRef(null);

  /* Scroll-reveal for children */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('intro-visible');
        }),
      { threshold: 0.12 }
    );
    sectionRef.current?.querySelectorAll('.intro-reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bp-intro-section" ref={sectionRef} id="intro">
      {/* ── decorative corner blobs (match Velocity red corners → navy here) ── */}
      <div className="bp-intro-corner bp-intro-corner--tl" />
      <div className="bp-intro-corner bp-intro-corner--br" />

      {/* ── subtle animated grid lines (Velocity uses a faint grid texture) ── */}
      <div className="bp-intro-grid" aria-hidden="true" />

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="align-items-center g-5">

          {/* ════════ LEFT — text content ════════ */}
          <Col lg={6} className="bp-intro-left">

            {/* Eyebrow — "DARE TO BE DIFFERENT?" (spaced caps, small) */}
            <p className="intro-reveal bp-intro-eyebrow">
              DARE TO BE DIFFERENT?
            </p>

            {/* Brand name — "MEET BOTPILOT AI" (gradient, huge) */}
            <h2 className="intro-reveal bp-intro-brand" style={{ animationDelay: '0.08s' }}>
              MEET BOTPILOT AI
            </h2>

            {/* Sub-heading — left-aligned, two-tone (bold + muted) */}
            <div className="intro-reveal bp-intro-subhead" style={{ animationDelay: '0.16s' }}>
              <span className="bp-intro-subhead--bold">A 360° Result-Oriented</span>
              <br />
              <span className="bp-intro-subhead--muted">Digital Solutions Agency</span>
            </div>

            {/* Body copy */}
            <p className="intro-reveal bp-intro-body" style={{ animationDelay: '0.24s' }}>
              At BOTPILOT AI, we promise results.<br />
              Our exceptional success rate comes from our tested and proven strategies,
              having worked with a diverse portfolio of niches across Pakistan and beyond.
            </p>

            {/* CTA button — Velocity uses a white pill button here */}
            <div className="intro-reveal" style={{ animationDelay: '0.34s' }}>
              <Link to="/about" className="bp-intro-cta">
                More About Us
              </Link>
            </div>
          </Col>

          {/* ════════ RIGHT — logo / brand mark ════════ */}
          <Col lg={6} className="d-flex align-items-center justify-content-center">
            <div className="intro-reveal bp-intro-logo-wrap" style={{ animationDelay: '0.2s' }}>

              {/* Animated glow ring behind the mark */}
              <div className="bp-intro-glow-ring" aria-hidden="true" />

              {/* The SVG logo mark — geometric "B" / bolt mark that echoes
                  Velocity's V-bolt. Built entirely in SVG, no image needed. */}
              <svg
                className="bp-intro-mark"
                viewBox="0 0 260 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="BOTPILOT AI brand mark"
              >
                <defs>
                  <linearGradient id="markGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%"   stopColor="#1a2a9c" />
                    <stop offset="50%"  stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#091060" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {/* Outer hexagon ring */}
                <polygon
                  points="130,14 236,72 236,188 130,246 24,188 24,72"
                  stroke="url(#markGrad)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.35"
                />
                {/* Inner hexagon */}
                <polygon
                  points="130,38 212,84 212,176 130,222 48,176 48,84"
                  stroke="url(#markGrad)"
                  strokeWidth="1.2"
                  fill="none"
                  opacity="0.18"
                />

                {/* Central "B" bolt shape — two overlapping chevrons like Velocity's V */}
                <g filter="url(#glow)">
                  {/* Top-left arm */}
                  <polyline
                    points="72,80 130,148 188,80"
                    stroke="url(#markGrad)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Bottom chevron (offset down — creates the "bolt" layered look) */}
                  <polyline
                    points="88,120 130,178 172,120"
                    stroke="url(#markGrad)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity="0.7"
                  />
                  {/* Vertical spine */}
                  <line
                    x1="130" y1="60"
                    x2="130" y2="195"
                    stroke="url(#markGrad)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                  {/* Horizontal top bar */}
                  <line
                    x1="92" y1="60"
                    x2="168" y2="60"
                    stroke="url(#markGrad)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </g>

                {/* Center dot */}
                <circle cx="130" cy="130" r="5" fill="#06b6d4" opacity="0.8" />
              </svg>

              {/* Wordmark below the mark */}
              <div className="bp-intro-wordmark">
                <span className="bp-intro-wordmark__main">BOTPILOT</span>
                <span className="bp-intro-wordmark__sub">DIGITAL SOLUTIONS</span>
              </div>
            </div>
          </Col>

        </Row>
      </Container>

      {/* ── Inline scoped styles ── */}
      <style>{`
        /* ── Section shell ── */
        .bp-intro-section {
          position: relative;
          overflow: hidden;
          padding: clamp(80px, 11vw, 130px) 0;
          background:
            radial-gradient(ellipse at 5%  20%, rgba(9,16,96,0.55) 0%, transparent 50%),
            radial-gradient(ellipse at 95% 80%, rgba(6,182,212,0.07) 0%, transparent 45%),
            #000000;
          isolation: isolate;
        }

        /* ── Faint grid texture (Velocity's subtle background pattern) ── */
        .bp-intro-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 55px 55px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Corner accent blobs ── */
        .bp-intro-corner {
          position: absolute;
          pointer-events: none;
          z-index: 1;
        }
        .bp-intro-corner--tl {
          top: 0; left: 0;
          width: 200px; height: 200px;
          background: radial-gradient(circle at 0% 0%, rgba(9,16,96,0.85) 0%, transparent 65%);
        }
        .bp-intro-corner--br {
          bottom: 0; right: 0;
          width: 200px; height: 200px;
          background: radial-gradient(circle at 100% 100%, rgba(9,16,96,0.7) 0%, transparent 65%);
        }

        /* ── Scroll-reveal base ── */
        .intro-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.65s cubic-bezier(0,0,0.2,1),
                      transform 0.65s cubic-bezier(0,0,0.2,1);
        }
        .intro-visible { opacity: 1 !important; transform: translateY(0) !important; }

        /* ── Eyebrow ── */
        .bp-intro-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 10px;
          font-family: 'Poppins', sans-serif;
        }

        /* ── Brand name — "MEET BOTPILOT AI" ── */
        .bp-intro-brand {
          font-size: clamp(2.8rem, 6.5vw, 5.2rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1;
          text-transform: uppercase;
          margin-bottom: 28px;
          font-family: 'Poppins', sans-serif;
          /* Gradient text matching Velocity's red gradient → our navy-to-cyan */
          background: linear-gradient(135deg, #1a2a9c 0%, #2563eb 45%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          /* Subtle text shadow for depth (Velocity's brand name has a glow) */
          filter: drop-shadow(0 0 28px rgba(6,182,212,0.22));
        }

        /* ── Sub-heading ── */
        .bp-intro-subhead {
          font-family: 'Poppins', sans-serif;
          line-height: 1.2;
          margin-bottom: 28px;
        }
        .bp-intro-subhead--bold {
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 800;
          color: #ffffff;
          display: block;
        }
        .bp-intro-subhead--muted {
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 800;
          color: rgba(255,255,255,0.28);
          display: block;
          letter-spacing: -0.01em;
        }

        /* ── Body copy ── */
        .bp-intro-body {
          font-size: 0.93rem;
          color: rgba(255,255,255,0.52);
          line-height: 1.85;
          max-width: 480px;
          margin-bottom: 40px;
          font-family: 'Poppins', sans-serif;
        }

        /* ── CTA button — Velocity uses white pill ── */
        .bp-intro-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 38px;
          border-radius: 50px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #000;
          background: #ffffff;
          text-decoration: none;
          border: none;
          transition: background 0.25s ease, color 0.25s ease,
                      transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .bp-intro-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, #091060 0%, #1a2a9c 50%, #06b6d4 100%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .bp-intro-cta:hover {
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(9,16,96,0.55);
        }
        .bp-intro-cta:hover::after { opacity: 1; }
        .bp-intro-cta span { position: relative; z-index: 1; }

        /* ── Right side — logo wrap ── */
        .bp-intro-logo-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        /* Pulsing glow ring (like Velocity's red glow around the V mark) */
        @keyframes introRingPulse {
          0%, 100% { transform: scale(1);   opacity: 0.18; }
          50%       { transform: scale(1.07); opacity: 0.32; }
        }
        .bp-intro-glow-ring {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          border: 1.5px solid rgba(6,182,212,0.25);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: introRingPulse 4s ease-in-out infinite;
          pointer-events: none;
        }
        .bp-intro-glow-ring::before {
          content: '';
          position: absolute;
          inset: 16px;
          border-radius: 50%;
          border: 1px solid rgba(9,16,96,0.5);
          animation: introRingPulse 4s ease-in-out infinite 0.5s;
        }

        /* ── SVG mark ── */
        @keyframes introMarkFloat {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-10px); }
        }
        .bp-intro-mark {
          width: clamp(180px, 28vw, 260px);
          height: auto;
          position: relative;
          z-index: 2;
          animation: introMarkFloat 5s ease-in-out infinite;
          filter: drop-shadow(0 0 32px rgba(6,182,212,0.18))
                  drop-shadow(0 8px 40px rgba(9,16,96,0.5));
        }

        /* ── Wordmark text below mark ── */
        .bp-intro-wordmark {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
          user-select: none;
        }
        .bp-intro-wordmark__main {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(1.5rem, 3.5vw, 2.1rem);
          font-weight: 900;
          letter-spacing: 0.18em;
          color: #ffffff;
          text-transform: uppercase;
          line-height: 1;
        }
        .bp-intro-wordmark__sub {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(0.55rem, 1.1vw, 0.72rem);
          font-weight: 600;
          letter-spacing: 0.32em;
          color: var(--bp-cyan, #06b6d4);
          text-transform: uppercase;
          margin-top: 5px;
        }

        /* ── Mobile ── */
        @media (max-width: 991.98px) {
          .bp-intro-section { padding: clamp(60px, 10vw, 90px) 0; }
          .bp-intro-left    { text-align: center; }
          .bp-intro-body    { margin-left: auto; margin-right: auto; }
          .bp-intro-cta     { margin: 0 auto; }
          .bp-intro-logo-wrap { margin-top: 10px; }
          .bp-intro-glow-ring { width: 220px; height: 220px; }
        }
      `}</style>
    </section>
  );
}
