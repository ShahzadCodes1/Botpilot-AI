/**
 * About Page — BOTPILOT AI
 * Our story, mission, core values, and team (all Bootstrap).
 */
import { Container, Row, Col } from 'react-bootstrap';
import Team from '../components/Team';

export default function About() {
  return (
    <>
      {/* Hero */}
      <section
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          minHeight: '50vh',
          paddingTop: 140, paddingBottom: 60,
          background: 'radial-gradient(ellipse at 30% 40%, rgba(37,99,235,.12) 0%, transparent 60%), var(--bp-dark)',
        }}
      >
        <div>
          <h1 className="display-4 fw-bold gradient-text text-uppercase mb-3">About BOTPILOT AI</h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: 650, fontSize: '1.1rem' }}>
            We&apos;re a team of passionate developers, designers, marketers &amp; AI specialists
            on a mission to help businesses in Pakistan grow and thrive online.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bp-section">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={5}>
              <div
                className="rounded-4 d-flex align-items-center justify-content-center"
                style={{
                  height: 380,
                  background: 'linear-gradient(135deg, #0a0f1c, #1a2a6c)',
                  border: '1px solid var(--bp-border)',
                  fontSize: '5rem', color: 'rgba(255,255,255,.1)',
                }}
              >🚀</div>
            </Col>
            <Col lg={7}>
              <h2 className="gradient-text fw-bold mb-4" style={{ fontSize: '2rem' }}>Our Story</h2>
              <p className="text-secondary lh-lg">
                BOTPILOT AI was born from a simple observation: businesses in Pakistan deserve
                world-class digital solutions without world-class pricing. Too many companies
                struggle with outdated websites, poor online presence, and wasted ad budgets.
              </p>
              <p className="text-secondary lh-lg">
                We started as a small team of digital enthusiasts who were tired of seeing
                brilliant products held back by weak marketing and lack of online presence.
                Today, we help businesses grow with cutting-edge websites, AI-powered chatbots,
                social media strategies, and high-ROI advertising campaigns.
              </p>
              <p className="text-secondary lh-lg">
                Our approach combines creative design with data-driven marketing and intelligent
                automation \u2014 all tailored to the unique needs of the Pakistani market.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values */}
      <section className="bp-section" style={{ background: 'var(--bp-card)' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="bp-section-title gradient-text">Our Core Values</h2>
            <p className="text-secondary">The principles that drive every decision we make</p>
          </div>
          <Row className="g-4 justify-content-center">
            {[
              { emoji: '⚡', title: 'Speed', desc: 'We believe in rapid delivery. From concept to launch in record time \u2014 your business can\u2019t wait.' },
              { emoji: '🎯', title: 'Results', desc: 'Every campaign, every design, every line of code is built to deliver measurable business growth.' },
              { emoji: '🤝', title: 'Partnership', desc: 'We don\'t just deliver and disappear. Your success is our success \u2014 we grow together.' },
              { emoji: '💡', title: 'Innovation', desc: 'From AI chatbots to viral social campaigns \u2014 we stay on the cutting edge so you stand out.' },
            ].map((v, i) => (
              <Col sm={6} lg={3} key={i}>
                <div className="bp-card text-center p-4 h-100">
                  <div style={{ fontSize: '2.5rem' }} className="mb-3">{v.emoji}</div>
                  <h6 className="fw-bold text-white mb-2">{v.title}</h6>
                  <p className="text-secondary small mb-0">{v.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Team />
    </>
  );
}
