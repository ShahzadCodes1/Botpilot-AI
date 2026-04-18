/**
 * Contact Page (full page) — BOTPILOT AI
 * Hero + Contact component + Google Maps embed (Bootstrap).
 */
import { Container } from 'react-bootstrap';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          minHeight: '40vh',
          paddingTop: 140, paddingBottom: 40,
          background: 'radial-gradient(ellipse at 70% 30%, rgba(124,58,237,.12) 0%, transparent 60%), var(--bp-dark)',
        }}
      >
        <div>
          <h1 className="display-4 fw-bold gradient-text text-uppercase mb-3">Contact Us</h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: 550, fontSize: '1.1rem' }}>
            Have a project in mind? Let&apos;s schedule a meeting.
          </p>
        </div>
      </section>

      <Contact />

      {/* Map */}
      <section className="py-5">
        <Container>
          <div className="rounded-4 overflow-hidden" style={{ height: 350, border: '1px solid var(--bp-border)' }}>
            <iframe
              title="BOTPILOT AI Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435519.227184!2d74.0064!3d31.4826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1"
              className="w-100 h-100 border-0"
              allowFullScreen
              loading="lazy"
              style={{ filter: 'grayscale(.8) invert(.9) contrast(1.2)' }}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
