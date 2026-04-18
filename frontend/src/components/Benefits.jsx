/**
 * Benefits Component (Why Choose Us) — BOTPILOT AI
 * Bootstrap grid of benefit cards with icons.
 */
import { Container, Row, Col } from 'react-bootstrap';

const benefits = [
  { icon: 'bi-lightning-charge', title: 'Fast Turnaround', desc: 'From concept to launch in record time—so you can start seeing results faster.' },
  { icon: 'bi-bar-chart-line', title: 'Data-Driven Results', desc: 'Every decision is backed by analytics to maximize performance and ROI.' },
  { icon: 'bi-people', title: 'Dedicated Team', desc: 'A skilled team of experts fully focused on growing your business.' },
  { icon: 'bi-graph-up-arrow', title: 'Scalable Solutions', desc: 'Flexible systems designed to grow alongside your brand at every stage.' },
  { icon: 'bi-palette', title: 'Creative Excellence', desc: 'High-impact design and content that capture attention and build identity.' },
  { icon: 'bi-headset', title: '24/7 Support', desc: 'Reliable, round-the-clock support to keep everything running smoothly.' },
];

export default function Benefits() {
  return (
    <section className="bp-section" id="benefits" style={{ background: 'rgba(17, 24, 39, 0.5)' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="bp-section-title gradient-text">Why Choose BOTPILOT AI?</h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: 600 }}>
            We don&apos;t just deliver projects — we deliver results that transform your business
          </p>
        </div>

        <Row className="g-4">
          {benefits.map((b, i) => (
            <Col md={6} lg={4} key={i}>
              <div className="bp-card d-flex align-items-start gap-3 p-4 h-100">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-3"
                  style={{ width: 50, height: 50, background: 'rgba(37,99,235,.1)', fontSize: '1.3rem', color: 'var(--bp-cyan)' }}
                >
                  <i className={`bi ${b.icon}`}></i>
                </div>
                <div>
                  <h6 className="fw-semibold text-white mb-1">{b.title}</h6>
                  <p className="text-secondary small mb-0">{b.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
