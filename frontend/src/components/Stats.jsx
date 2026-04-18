/**
 * Stats Component — BOTPILOT AI
 * Animated counters with Bootstrap grid + Intersection Observer for count-up.
 */
import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const statsData = [
  { target: 150, suffix: '+', label: 'Projects Delivered', icon: 'bi-rocket-takeoff' },
  { target: 12, suffix: '+', label: 'Countries Served', icon: 'bi-globe-americas' },
  { target: 5, suffix: '+', label: 'Years Experience', icon: 'bi-calendar-check' },
  { target: 50, suffix: '+', label: 'Happy Clients', icon: 'bi-emoji-smile' },
];

function useCountUp(target, start, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, start, duration]);
  return count;
}

function StatItem({ target, suffix, label, icon }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(target, visible);

  return (
    <Col xs={6} lg={3} className="text-center py-3" ref={ref}>
      <i className={`bi ${icon} d-block mb-2`} style={{ fontSize: '1.6rem', color: 'var(--bp-cyan)' }}></i>
      <div className="gradient-text fw-bold" style={{ fontSize: '2.8rem', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div className="text-secondary text-uppercase small mt-2 fw-semibold" style={{ letterSpacing: 1 }}>
        {label}
      </div>
    </Col>
  );
}

export default function Stats() {
  return (
    <section
      id="stats"
      className="py-5 position-relative"
      style={{ background: 'rgba(17, 24, 39, 0.5)' }}
    >
      <hr className="bp-divider m-0 position-absolute top-0 w-100" />
      <Container>
        <Row className="justify-content-center">
          {statsData.map((s, i) => <StatItem key={i} {...s} />)}
        </Row>
      </Container>
      <hr className="bp-divider m-0 position-absolute bottom-0 w-100" />
    </section>
  );
}
