/**
 * ServiceDetail Page — BOTPILOT AI
 * Dynamic page that renders full content for each service
 * (overview, features, benefits, process, use cases, FAQ, CTA).
 * Uses the :serviceId URL param to look up data from servicesData.
 */
import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import servicesData from '../data/servicesData';

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = servicesData.find((s) => s.id === serviceId);

  /* 404 — unknown service */
  if (!service) return <Navigate to="/" replace />;

  /* Find prev/next for navigation */
  const idx = servicesData.indexOf(service);
  const prev = idx > 0 ? servicesData[idx - 1] : null;
  const next = idx < servicesData.length - 1 ? servicesData[idx + 1] : null;

  return (
    <>
      {/* ─── HERO ──────────────────────────────── */}
      <section className="service-page-hero text-center text-lg-start">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <Link to="/#services" className="text-info text-decoration-none small mb-3 d-inline-block">
                <i className="bi bi-arrow-left me-1"></i> All Services
              </Link>
              <h1 className="display-5 fw-bold text-white mb-3">{service.name}</h1>
              <p className="lead text-secondary mb-4" style={{ maxWidth: 560 }}>{service.tagline}</p>
              <Link to="/contact" className="btn btn-bp btn-lg px-5">
                Get a Free Consultation <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </Col>
            <Col lg={5} className="text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-4 mx-auto"
                style={{
                  width: 200, height: 200,
                  background: 'rgba(37,99,235,.08)',
                  border: '1px solid var(--bp-border)',
                }}
              >
                <i className={`bi ${service.icon}`} style={{ fontSize: '5rem', color: 'var(--bp-accent)' }}></i>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ─── DESCRIPTION ───────────────────────── */}
      <section className="bp-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <h2 className="gradient-text fw-bold mb-4">Overview</h2>
              <p className="text-secondary fs-5 lh-lg">{service.description}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ─── FEATURES ──────────────────────────── */}
      <section className="bp-section" style={{ background: 'var(--bp-card)' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="bp-section-title gradient-text">What&apos;s Included</h2>
            <p className="text-secondary">Everything you get with this service</p>
          </div>
          <Row className="g-4 justify-content-center">
            {service.features.map((feat, i) => (
              <Col sm={6} lg={4} key={i}>
                <div className="bp-card p-4 h-100 d-flex align-items-start gap-3">
                  <i className="bi bi-check-circle-fill flex-shrink-0 mt-1" style={{ color: 'var(--bp-cyan)', fontSize: '1.2rem' }}></i>
                  <span className="text-white">{feat}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ─── HOW WE WORK (PROCESS) ─────────────── */}
      {service.process && (
        <section className="bp-section">
          <Container>
            <div className="text-center mb-5">
              <h2 className="bp-section-title gradient-text">How We Work</h2>
              <p className="text-secondary">Our proven step-by-step process</p>
            </div>
            <Row className="justify-content-center">
              <Col lg={10}>
                {service.process.map((p, i) => (
                  <div key={i} className="d-flex align-items-start gap-4 mb-4">
                    {/* Step number */}
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-circle fw-bold"
                      style={{
                        width: 52, height: 52,
                        background: 'var(--bp-gradient)',
                        fontSize: '1.1rem', color: '#fff',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h5 className="text-white fw-semibold mb-1">{p.step}</h5>
                      <p className="text-secondary mb-0">{p.detail}</p>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* ─── BENEFITS ──────────────────────────── */}
      <section className="bp-section" style={{ background: 'var(--bp-card)' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="bp-section-title gradient-text">Key Benefits</h2>
            <p className="text-secondary">Measurable results you can expect</p>
          </div>
          <Row className="g-4 justify-content-center">
            {service.benefits.map((b, i) => (
              <Col md={6} key={i}>
                <div className="bp-card p-4 d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{ width: 48, height: 48, background: 'var(--bp-gradient)', fontSize: '1.2rem' }}
                  >
                    <i className="bi bi-star-fill text-white"></i>
                  </div>
                  <span className="text-white fs-6">{b}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ─── USE CASES ─────────────────────────── */}
      {service.useCases && (
        <section className="bp-section">
          <Container>
            <div className="text-center mb-5">
              <h2 className="bp-section-title gradient-text">Who Is This For?</h2>
              <p className="text-secondary">Perfect for businesses like yours</p>
            </div>
            <Row className="g-4 justify-content-center">
              {service.useCases.map((uc, i) => (
                <Col md={6} key={i}>
                  <div className="bp-card p-4 d-flex align-items-start gap-3 h-100">
                    <i className="bi bi-arrow-right-circle-fill flex-shrink-0 mt-1" style={{ color: 'var(--bp-accent)', fontSize: '1.3rem' }}></i>
                    <span className="text-secondary">{uc}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* ─── FAQ ───────────────────────────────── */}
      {service.faq && (
        <section className="bp-section" style={{ background: 'var(--bp-card)' }}>
          <Container>
            <div className="text-center mb-5">
              <h2 className="bp-section-title gradient-text">Frequently Asked Questions</h2>
              <p className="text-secondary">Got questions? We\u2019ve got answers.</p>
            </div>
            <Row className="justify-content-center">
              <Col lg={8}>
                <Accordion flush>
                  {service.faq.map((item, i) => (
                    <Accordion.Item eventKey={String(i)} key={i} className="border-0 mb-3" style={{ background: 'var(--bp-dark)', borderRadius: 12, overflow: 'hidden' }}>
                      <Accordion.Header className="bp-accordion-header">
                        {item.q}
                      </Accordion.Header>
                      <Accordion.Body className="text-secondary">
                        {item.a}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* ─── CTA ───────────────────────────────── */}
      <section className="py-5" style={{ background: 'var(--bp-dark)' }}>
        <Container className="text-center">
          <h3 className="gradient-text fw-bold mb-3" style={{ fontSize: '2rem' }}>
            Ready to Get Started with {service.name}?
          </h3>
          <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: 500 }}>
            Schedule a free consultation and let our experts craft a solution tailored to your needs.
          </p>
          <Link to="/contact" className="btn btn-bp btn-lg px-5">
            Schedule a Meeting <i className="bi bi-calendar-event ms-1"></i>
          </Link>
        </Container>
      </section>

      {/* ─── PREV / NEXT NAV ──────────────────── */}
      <section className="py-4" style={{ borderTop: '1px solid var(--bp-border)' }}>
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col xs="auto">
              {prev && (
                <Link to={`/services/${prev.id}`} className="text-info text-decoration-none d-flex align-items-center gap-2">
                  <i className="bi bi-arrow-left"></i>
                  <span className="small">{prev.name}</span>
                </Link>
              )}
            </Col>
            <Col xs="auto">
              {next && (
                <Link to={`/services/${next.id}`} className="text-info text-decoration-none d-flex align-items-center gap-2">
                  <span className="small">{next.name}</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
