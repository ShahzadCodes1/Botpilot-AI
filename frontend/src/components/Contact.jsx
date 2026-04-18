/**
 * Contact Component — BOTPILOT AI
 * Layout & structure mirrors Velocity Digital's contact page exactly.
 * Colors: #091060 (navy) and #000000 (black) brand theme.
 * Sends email via FormSubmit.co + saves to FastAPI backend.
 */
import { useState } from 'react';
import { Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import { FiClock, FiMapPin, FiHeadphones } from "react-icons/fi";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/ahmad.dstech@gmail.com';

/* ── Small icon SVG matching Velocity's thin zigzag/checkmark accent ── */
function AccentIcon() {
  return (
    <svg
      width="27" height="16" viewBox="0 0 27 16" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', marginBottom: '0.75rem' }}
    >
      <path d="M0 8 L6 0 L13 14 L19 3 L27 8" stroke="var(--bp-navy-light, #1a2a9c)"
        strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          _subject: `New Contact: ${form.name} — BOTPILOT AI`,
          _template: 'table',
          _captcha: 'true',
        }),
      });
      if (!res.ok) throw new Error('FormSubmit failed');

      try {
        await fetch(`${API_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } catch { /* backend save is optional */ }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ════════════════════════════════════════════════════
          HERO BANNER  — "CONTACT US" full-width title block
          Mirrors Velocity's big uppercase page-title section
          ════════════════════════════════════════════════════ */}
      

      {/* ════════════════════════════════════════════════════
          CONTACT INFO CARDS — three info blocks side-by-side
          Exactly as Velocity: Open Hours | Address | Get in touch
          ════════════════════════════════════════════════════ */}
      <section className="vc-info-section">
        <Container>
          <Row className="g-0 vc-info-row">

            {/* Open Hours */}
            <Col md={4} className="vc-info-col vc-info-col--bordered">
              <div className="vc-info-block">
                <FiClock className="vc-info-icon" />
                <h4 className="vc-info-label">Open hours</h4>
                <p className="vc-info-text">
                  Mon-Fri: 10 AM – 6 PM<br />     Sat-Sun: Off
                </p>
              </div>
            </Col>

            {/* Address */}
            <Col md={4} className="vc-info-col vc-info-col--bordered">
              <div className="vc-info-block">
                <FiMapPin className="vc-info-icon" />
                <h4 className="vc-info-label">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="vc-info-link"
                  >
                    Address
                  </a>
                </h4>
                <p className="vc-info-text">
                  🇵🇰 Alipur Road Hafizabad, Punjab, Pakistan
                </p>
              </div>
            </Col>

            {/* Get in touch */}
            <Col md={4} className="vc-info-col">
              <div className="vc-info-block">
                <FiHeadphones className="vc-info-icon" />
                <h4 className="vc-info-label">Get in touch</h4>
                <p className="vc-info-text mb-1">
                  Telephone:{' '}
                  <a href="tel:+923001234567" className="vc-info-link">
                    +92 300 1234567
                  </a>
                </p>
                <p className="vc-info-text mb-0">
                  Email:{' '}
                  <a href="mailto:ahmad.dstech@gmail.com" className="vc-info-link">
                    ahmad.dstech@gmail.com
                  </a>
                </p>
              </div>
            </Col>

          </Row>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════
          CTA BAND  — "From Unknown to Unstoppable"
          Mirrors Velocity's dark gradient CTA strip with
          the centered heading + booking call button
          ════════════════════════════════════════════════════ */}
      <section className="vc-cta-band">
        {/* decorative corner accents */}
        <div className="vc-corner vc-corner--tl vc-corner--sm" />
        <div className="vc-corner vc-corner--br vc-corner--sm" />
        <Container className="position-relative text-center" style={{ zIndex: 2 }}>
          <p className="vc-cta-eyebrow">Get in Touch!</p>
          <h2 className="vc-cta-heading">From Unknown to Unstoppable</h2>

          {/* Contact Form — embedded directly in the CTA band exactly like Velocity */}
          <div className="vc-form-wrap mx-auto mt-5">
            <Form onSubmit={handleSubmit} noValidate>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="vc-input"
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="vc-input"
                  />
                </Col>
                <Col xs={12}>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="vc-input"
                  />
                </Col>
                <Col xs={12}>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    placeholder="Your Message *"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="vc-input vc-input--textarea"
                  />
                </Col>
                <Col xs={12}>
                  <button
                    type="submit"
                    className="vc-submit-btn"
                    disabled={loading}
                  >
                    {loading
                      ? <><Spinner size="sm" className="me-2" />Sending…</>
                      : <>Book A Free Discovery Call &nbsp;<i className="bi bi-arrow-right" /></>
                    }
                  </button>
                </Col>
              </Row>

              {status === 'success' && (
                <Alert variant="success" className="mt-4 text-center vc-alert">
                  ✅ Message sent! We'll be in touch within 24 hours.
                </Alert>
              )}
              {status === 'error' && (
                <Alert variant="danger" className="mt-4 text-center vc-alert">
                  ❌ Something went wrong. Please email us directly.
                </Alert>
              )}
            </Form>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════
          Inline scoped styles — kept here so the
          component is fully self-contained and
          matches Velocity's visual language exactly.
          All accent colours swapped to #091060/#000.
          ════════════════════════════════════════════ */}
      <style>{`
        /* ── Page-hero banner ── */
        .vc-page-hero {
          position: relative;
          overflow: hidden;
          padding: 110px 0 80px;
          background:
            radial-gradient(ellipse at 10% 50%, rgba(9,16,96,0.55) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 20%, rgba(6,182,212,0.10) 0%, transparent 50%),
            #000000;
          text-align: center;
        }

        .vc-info-icon {
  font-size: 60px;
  color: #091060;
  margin-bottom: 20px;
  display: block;
}

        .vc-page-hero__title {
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 900;
          letter-spacing: 0.06em;
          color: #ffffff;
          text-transform: uppercase;
          line-height: 1;
          /* gradient text — same treatment Velocity uses on its big headings */
          background: linear-gradient(135deg, #ffffff 0%, rgba(6,182,212,0.85) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
          .vc-info-block {
  padding: 48px 40px;
  height: 100%;
  background: rgba(9,16,96,0.06);
  transition: background 0.3s ease;

  /* ADD THIS */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

        /* ── Corner accent blobs ── */
        .vc-corner {
          position: absolute;
          width: 220px;
          height: 220px;
          pointer-events: none;
          z-index: 1;
        }
        .vc-corner--sm { width: 140px; height: 140px; }
        .vc-corner--tl {
          top: 0; left: 0;
          background: radial-gradient(circle at 0% 0%, rgba(9,16,96,0.9) 0%, transparent 70%);
        }
        .vc-corner--br {
          bottom: 0; right: 0;
          background: radial-gradient(circle at 100% 100%, rgba(9,16,96,0.7) 0%, transparent 70%);
        }

        /* ── Info section ── */
        .vc-info-section {
          background: #000000;
          padding: 64px 0 72px;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .vc-info-row {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
        }

        .vc-info-col {
          padding: 0;
        }
        .vc-info-col--bordered {
          border-right: 1px solid rgba(255,255,255,0.08);
        }

        .vc-info-block {
          padding: 48px 40px;
          height: 100%;
          background: rgba(9,16,96,0.06);
          transition: background 0.3s ease;
        }
        .vc-info-block:hover {
          background: rgba(9,16,96,0.18);
        }

        .vc-info-label {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .vc-info-text {
          font-size: 0.9.5rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.75;
          margin-bottom: 0;
          text-align: center;
        }

        .vc-info-link {
          color: var(--bp-cyan, #06b6d4);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .vc-info-link:hover { color: #ffffff; }

        /* ── CTA band ── */
        .vc-cta-band {
          position: relative;
          overflow: hidden;
          padding: 100px 0 120px;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(9,16,96,0.7) 0%, transparent 60%),
            #000000;
        }

        .vc-cta-eyebrow {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--bp-cyan, #06b6d4);
          margin-bottom: 12px;
        }

        .vc-cta-heading {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900;
          letter-spacing: -0.01em;
          color: #ffffff;
          text-transform: uppercase;
          line-height: 1.1;
        }

        /* ── Form wrapper ── */
        .vc-form-wrap {
          max-width: 700px;
          text-align: left;
        }

        /* ── Inputs — dark, borderline style matching Velocity form feel ── */
        .vc-input {
          background: rgba(255,255,255,0.04) !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          border-radius: 10px !important;
          color: #ffffff !important;
          padding: 14px 18px !important;
          font-size: 0.9rem !important;
          font-family: 'Poppins', sans-serif !important;
          transition: border-color 0.25s ease, background 0.25s ease !important;
          width: 100%;
        }
        .vc-input:focus {
          outline: none !important;
          box-shadow: none !important;
          border-color: rgba(9,16,96,0.8) !important;
          background: rgba(9,16,96,0.12) !important;
        }
        .vc-input::placeholder { color: rgba(255,255,255,0.35) !important; }
        .vc-input--textarea   { resize: vertical; min-height: 130px; }

        /* ── Submit button — matches Velocity's CTA button style exactly ── */
        .vc-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 16px 32px;
          border: none;
          border-radius: 50px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #ffffff;
          background: linear-gradient(135deg, #091060 0%, #1a2a9c 50%, #06b6d4 100%);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          margin-top: 6px;
        }
        .vc-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(9,16,96,0.55);
        }
        .vc-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* ── Alert overrides ── */
        .vc-alert {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: #fff !important;
          border-radius: 10px !important;
        }

        /* ── Responsive ── */
        @media (max-width: 767.98px) {
          .vc-info-col--bordered {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .vc-info-block { padding: 36px 28px; }
          .vc-page-hero  { padding: 90px 0 60px; }
          .vc-cta-band   { padding: 70px 0 90px; }
        }
      `}</style>
    </>
  );
}
