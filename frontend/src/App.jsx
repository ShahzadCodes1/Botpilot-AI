/**
 * App.jsx — Root component — BOTPILOT AI
 * React Router with Navbar, Footer, page routes, and service detail dynamic route.
 */
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FluidBackground from './components/FluidBackground';
import Home from './pages/Home';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
import ServiceDetail from './pages/ServiceDetail';
import Blog from './pages/Blog';

/* Scrolls to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <FluidBackground />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
