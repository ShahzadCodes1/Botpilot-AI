/**
 * Services Component — BOTPILOT AI
 * Interactive service cards with hover-reveal expanded content,
 * animated icons, and a cursor-tracking background glow.
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import servicesData from '../data/servicesData';

export default function Services() {
  const gridRef = useRef(null);
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [activeCard, setActiveCard] = useState(null);

  /* Scroll-reveal animation */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    gridRef.current?.querySelectorAll('.fade-in').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Cursor-tracking background glow */
  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  /* Pick glow color based on which card is hovered */
  const getGlowColor = () => {
    if (activeCard === null) return 'rgba(37, 99, 235, 0.15)';
    const colors = [
      'rgba(37, 99, 235, 0.30)',  // blue
      'rgba(124, 58, 237, 0.30)', // purple
      'rgba(6, 182, 212, 0.30)',  // cyan
      'rgba(236, 72, 153, 0.28)', // pink
      'rgba(34, 197, 94, 0.28)',  // green
    ];
    return colors[activeCard % colors.length];
  };

  const cardColors = [
    { accent: '#2563eb', bg: 'rgba(37,99,235,.12)' },
    { accent: '#7c3aed', bg: 'rgba(124,58,237,.12)' },
    { accent: '#06b6d4', bg: 'rgba(6,182,212,.12)' },
    { accent: '#ec4899', bg: 'rgba(236,72,153,.12)' },
    { accent: '#22c55e', bg: 'rgba(34,197,94,.12)' },
  ];

  return (
    <section
      className="bp-section services-section"
      id="services"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'transparent',
      }}
    >
      <Container>
        <div className="text-center mb-5">
          <h2 className="bp-section-title gradient-text">What We Offer</h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: 620 }}>
            End-to-end digital solutions — from websites to AI chatbots, social media to paid ads
          </p>
        </div>

        <Row 
  ref={gridRef} 
  className="g-4 pb-3"
  style={{ scrollbarWidth: 'thin' }}
>
          {servicesData.map((service, i) => {
            const color = cardColors[i % cardColors.length];
            return (
              <Col key={service.id} style={{ flex: 1, minWidth: 0 }}>
                <Link to={`/services/${service.id}`} className="text-decoration-none">
                  <div
                    className={` className="service-hover-card bp-card text-center p-4 h-100 fade-in}`}
                    style={{ transitionDelay: `${i * 0.05}s`, '--card-accent': color.accent }}
                    onMouseEnter={() => setActiveCard(i)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    {/* Animated icon */}
                    <div
                      className="service-icon-wrap d-flex align-items-center justify-content-center mx-auto mb-3 rounded-3"
                      style={{
                        width: 64, height: 64,
                        background: color.bg,
                        fontSize: '1.6rem',
                        color: color.accent,
                        transition: 'all .4s cubic-bezier(.4,0,.2,1)',
                      }}
                    >
                      <i className={`bi ${service.icon}`}></i>
                    </div>

                    <h6 className="text-white fw-semibold mb-2">{service.name}</h6>
                    <p className="text-secondary small mb-0 service-tagline">{service.tagline}</p>

                    {/* Hover reveal: features preview */}
                    <div className="service-hover-reveal">
                      <hr style={{ borderColor: 'rgba(255,255,255,.06)', margin: '12px 0' }} />
                      <ul className="service-features-list text-start">
                        {service.features.slice(0, 3).map((f, fi) => (
                          <li key={fi} className="text-secondary small" style={{ animationDelay: `${fi * 0.08}s` }}>
                            <i className="bi bi-check-circle-fill me-1" style={{ color: color.accent, fontSize: '.7rem' }}></i>
                            {f.length > 45 ? f.substring(0, 45) + '…' : f}
                          </li>
                        ))}
                      </ul>
                      <span className="service-cta-text" style={{ color: color.accent }}>
                        Learn More <i className="bi bi-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}
