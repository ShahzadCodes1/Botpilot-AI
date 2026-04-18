/**
 * Team Component — BOTPILOT AI
 * Team member cards with Bootstrap grid, real photos, and social links.
 */
import { Container, Row, Col } from 'react-bootstrap';

const team = [
  { name: 'Muhammad Umar', role: 'CEO & Founder', image: '/team/muhammad-umar.jpeg' },
  { name: 'Muhammad Ahmad', role: 'Website & Chatbot Developer', image: '/team/muhammad-ahmad.png' },
  { name: 'Hira Khalid', role: 'Social Media Manager', image: '/team/hira-khalid.jpeg' },
  { name: 'Anam Parveen', role: 'Graphic Designer', image: '/team/anam-parveen.jpeg' },
  { name: 'Syed Awais Bacha', role: 'Video Editor', image: '/team/awais-bacha.jpeg' },
];

export default function Team() {
  return (
    <section className="bp-section" id="team">
      <Container>
        <div className="text-center mb-5">
          <h2 className="bp-section-title gradient-text">Meet the Team</h2>
          <p className="text-secondary">The creative minds behind your brand’s growth</p>
        </div>

        <Row className="g-4 flex-nowrap overflow-auto pb-2">
          {team.map((m, i) => (
<Col key={i} className="d-flex" style={{ minWidth: '260px' }}>              <div className="bp-card text-center overflow-hidden w-100 d-flex flex-column">
                {/* Avatar */}
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    height: 240,
                    background: 'linear-gradient(135deg, #0a0f1c 0%, #1a2a6c 100%)',
                  }}
                >
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                  ) : (
                    <i className="bi bi-person-circle" style={{ fontSize: '4rem', color: 'rgba(255,255,255,.15)' }}></i>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <h6 className="fw-bold text-white mb-1">{m.name}</h6>
                  <p className="small mb-0" style={{ color: 'var(--bp-cyan)' }}>{m.role}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
