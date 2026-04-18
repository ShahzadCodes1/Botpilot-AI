/**
 * Navbar Component — BOTPILOT AI
 * Bootstrap-based responsive navbar with "We Offer" mega dropdown that
 * reveals service options on hover with smooth animations.
 */
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap';
import servicesData from '../data/servicesData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close dropdown on route change */
  useEffect(() => { setDropdownOpen(false); }, [location.pathname]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  return (
    <BsNavbar
      expand="lg"
      fixed="top"
      variant="dark"
      className={`navbar-dark-custom py-2 ${scrolled ? 'scrolled' : ''}`}
      style={{ background: scrolled ? undefined : 'transparent' }}
    >
      <Container>
        {/* Logo */}
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-bold fs-4">
          <span
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{ width: 38, height: 38, background: 'var(--bp-gradient)', fontSize: '1.1rem' }}
          >
            🤖
          </span>
          <span className="gradient-text">BOTPILOT AI</span>
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="main-nav" />

        <BsNavbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-1">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Home</Nav.Link>

            {/* We Offer — Custom Hover Mega Dropdown */}
            <div
              className="nav-item position-relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#services"
                className={`nav-link d-flex align-items-center gap-1 we-offer-trigger ${dropdownOpen ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setDropdownOpen(!dropdownOpen); }}
              >
                We Offer
                <i className={`bi bi-chevron-down we-offer-chevron ${dropdownOpen ? 'rotated' : ''}`} style={{ fontSize: '.7rem', transition: 'transform .3s ease' }}></i>
              </a>

              {/* Dropdown Panel */}
              <div className={`we-offer-dropdown ${dropdownOpen ? 'open' : ''}`}>
                <div className="we-offer-dropdown-inner">
                  {servicesData.map((s, i) => (
                    <Link
                      key={s.id}
                      to={`/services/${s.id}`}
                      className="we-offer-item"
                      style={{ animationDelay: `${i * 0.05}s` }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="we-offer-icon-wrap">
                        <i className={`bi ${s.icon}`}></i>
                      </div>
                      <div>
                        <div className="we-offer-item-title">{s.name}</div>
                        <div className="we-offer-item-desc">{s.tagline}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Nav.Link as={Link} to="/about" active={location.pathname === '/about'}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" active={location.pathname === '/contact'}>Contact Us</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            

            <Link to="/contact" className="btn btn-bp ms-lg-3 px-4 py-2">
              Schedule a Meeting
            </Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
