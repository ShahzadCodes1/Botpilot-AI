/**
 * Footer Component — BOTPILOT AI
 * Multi-column dark footer with gradient logo, nav columns,
 * gradient divider and social icon buttons.
 */
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const SERVICES = [
  ['website-development',        'Website Development'       ],
  ['ai-chatbot-automation',      'AI Chatbot & Automation'   ],
  ['social-media-management',    'Social Media Management'   ],
  ['google-meta-ads',            'Google & Meta Ads'         ],
  ['video-editing-graphic-design','Video Editing & Design'   ],
];

const SOCIALS = [
  { icon: 'bi-facebook',  href: '#' },
  { icon: 'bi-instagram', href: '#' },
  { icon: 'bi-linkedin',  href: '#' },
  { icon: 'bi-twitter-x', href: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bp-footer pt-5 pb-4">
      {/* Top gradient divider */}
      <hr className="bp-divider m-0 mb-5" />

      <Container>
        <Row className="g-5 mb-5">
          {/* ── Brand col ── */}
          <Col lg={4}>
            <div className="d-flex align-items-center gap-2 mb-3 fw-bold" style={{ fontSize: '1.1rem' }}>
              <span
                className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                style={{ width: 36, height: 36, background: 'var(--bp-gradient)', fontSize: '1rem' }}
              >
                🤖
              </span>
              <span className="gradient-text">BOTPILOT AI</span>
            </div>
            <p className="text-secondary mb-4" style={{ fontSize: '0.83rem', lineHeight: 1.8, maxWidth: 290 }}>
              Pakistan&apos;s premier digital &amp; AI solutions agency. Websites, chatbots,
              social media, ads &amp; creative design that get real results.
            </p>

            {/* Social icons */}
            <div className="d-flex gap-2">
              {SOCIALS.map(({ icon, href }) => (
                <a
                  key={icon}
                  href={href}
                  aria-label={icon}
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: 38, height: 38,
                    background: 'rgba(9,16,96,0.25)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bp-navy)';
                    e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(9,16,96,0.25)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <i className={`bi ${icon}`} />
                </a>
              ))}
            </div>
          </Col>

          {/* ── Services col ── */}
          <Col sm={6} lg={3}>
            <h6
              className="text-white fw-bold mb-4"
              style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              Services
            </h6>
            <ul className="list-unstyled mb-0">
              {SERVICES.map(([id, label]) => (
                <li key={id} className="mb-3">
                  <Link
                    to={`/services/${id}`}
                    className="text-secondary"
                    style={{ fontSize: '0.84rem' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* ── Company col ── */}
          <Col sm={6} lg={2}>
            <h6
              className="text-white fw-bold mb-4"
              style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              Company
            </h6>
            <ul className="list-unstyled mb-0">
              {[
                ['/about',   'About Us'  ],
                ['/contact', 'Contact'   ],
                ['#team',    'Our Team'  ],
                ['#benefits','Why Us'    ],
              ].map(([to, label]) => (
                <li key={label} className="mb-3">
                  {to.startsWith('#')
                    ? <a href={to} className="text-secondary" style={{ fontSize: '0.84rem' }}>{label}</a>
                    : <Link to={to} className="text-secondary" style={{ fontSize: '0.84rem' }}>{label}</Link>
                  }
                </li>
              ))}
            </ul>
          </Col>

          {/* ── Contact col ── */}
          <Col sm={6} lg={3}>
            <h6
              className="text-white fw-bold mb-4"
              style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              Get in Touch
            </h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-3 d-flex gap-2 align-items-start">
                <i className="bi bi-clock mt-1" style={{ color: 'var(--bp-cyan)', fontSize: '0.85rem', flexShrink: 0 }} />
                <span className="text-secondary" style={{ fontSize: '0.83rem', lineHeight: 1.65 }}>
                  Mon–Fri: 10 AM – 6 PM
                </span>
              </li>
              <li className="mb-3 d-flex gap-2 align-items-start">
                <i className="bi bi-geo-alt mt-1" style={{ color: 'var(--bp-cyan)', fontSize: '0.85rem', flexShrink: 0 }} />
                <span className="text-secondary" style={{ fontSize: '0.83rem', lineHeight: 1.65 }}>
                  Lahore, Punjab, Pakistan
                </span>
              </li>
              <li className="mb-3 d-flex gap-2 align-items-start">
                <i className="bi bi-envelope mt-1" style={{ color: 'var(--bp-cyan)', fontSize: '0.85rem', flexShrink: 0 }} />
                <a
                  href="mailto:ahmad.dstech@gmail.com"
                  className="text-secondary"
                  style={{ fontSize: '0.83rem', wordBreak: 'break-all' }}
                >
                  ahmad.dstech@gmail.com
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Bottom bar */}
        <hr style={{ borderColor: 'rgba(255,255,255,0.05)', margin: '0 0 20px' }} />
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2"
          style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
          <span>&copy; {year} BOTPILOT AI. All rights reserved.</span>
          <span>
            Built with ❤️ in{' '}
            <a href="#" style={{ color: 'var(--bp-cyan)', textDecoration: 'none' }}>Pakistan</a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
