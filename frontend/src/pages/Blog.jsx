/**
 * Blog Page — BOTPILOT AI
 * Velocity-inspired dark editorial blog with:
 * - Hero banner (same page-hero style as Contact)
 * - Category filter tabs
 * - Featured post (large card, full-width)
 * - Grid of article cards with hover effects
 * - Sidebar: newsletter signup + popular posts
 * - Load more pagination
 *
 * Colours: #091060 navy · #000 black · #06b6d4 cyan
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/* ─── Blog data ──────────────────────────────────────────── */
const CATEGORIES = ['All', 'AI & Automation', 'Web Development', 'Social Media', 'Paid Ads', 'Branding'];

const POSTS = [
  {
    id: 1,
    category: 'AI & Automation',
    tag: 'AI & Automation',
    title: 'How AI Chatbots Are Transforming Customer Support in 2025',
    excerpt: 'Discover how businesses across Pakistan and beyond are slashing response times by 80% and boosting customer satisfaction with intelligent AI chatbot systems.',
    author: 'Muhammad Ahmad',
    role: 'AI Developer',
    date: 'Apr 10, 2025',
    readTime: '6 min read',
    featured: true,
    gradient: 'linear-gradient(135deg, #091060 0%, #1a2a9c 60%, #06b6d4 100%)',
    icon: '🤖',
  },
  {
    id: 2,
    category: 'Web Development',
    tag: 'Web Dev',
    title: '7 Must-Have Features for a High-Converting Business Website',
    excerpt: 'Most business websites lose visitors in under 8 seconds. Here\'s what separates the top-performing sites from the ones that quietly bleed revenue.',
    author: 'Muhammad Umar',
    role: 'CEO & Founder',
    date: 'Apr 4, 2025',
    readTime: '5 min read',
    featured: false,
    gradient: 'linear-gradient(135deg, #0d1880 0%, #1a2a9c 100%)',
    icon: '💻',
  },
  {
    id: 3,
    category: 'Social Media',
    tag: 'Social Media',
    title: 'Instagram vs TikTok in 2025: Where Should Your Brand Be?',
    excerpt: 'The social media battlefield has shifted dramatically. We break down the data on reach, engagement, and ROI so you can invest in the right platform.',
    author: 'Hira Khalid',
    role: 'Social Media Manager',
    date: 'Mar 28, 2025',
    readTime: '4 min read',
    featured: false,
    gradient: 'linear-gradient(135deg, #091060 0%, #06b6d4 100%)',
    icon: '📱',
  },
  {
    id: 4,
    category: 'Paid Ads',
    tag: 'Paid Ads',
    title: 'Meta Ads in Pakistan: The Complete 2025 Strategy Guide',
    excerpt: 'Running Meta ads without a clear strategy is burning money. This step-by-step guide covers targeting, creatives, budgeting and scaling for the Pakistani market.',
    author: 'Muhammad Umar',
    role: 'CEO & Founder',
    date: 'Mar 19, 2025',
    readTime: '8 min read',
    featured: false,
    gradient: 'linear-gradient(135deg, #0a1260 0%, #2563eb 100%)',
    icon: '📊',
  },
  {
    id: 5,
    category: 'Branding',
    tag: 'Branding',
    title: 'Why Your Logo Is Not Your Brand (And What Actually Is)',
    excerpt: 'A brand is not a logo. It\'s not a color palette. This piece explores the psychology behind memorable brands and what you need to build one that lasts.',
    author: 'Anam Parveen',
    role: 'Graphic Designer',
    date: 'Mar 12, 2025',
    readTime: '5 min read',
    featured: false,
    gradient: 'linear-gradient(135deg, #091060 0%, #1a2a9c 70%, #06b6d4 100%)',
    icon: '🎨',
  },
  {
    id: 6,
    category: 'AI & Automation',
    tag: 'AI & Automation',
    title: 'Automating Lead Generation: From Form to CRM Without Lifting a Finger',
    excerpt: 'We built a fully automated lead pipeline for a client that now processes 300+ leads a week with zero manual effort. Here\'s exactly how we did it.',
    author: 'Muhammad Ahmad',
    role: 'AI Developer',
    date: 'Mar 5, 2025',
    readTime: '7 min read',
    featured: false,
    gradient: 'linear-gradient(135deg, #0d1880 0%, #06b6d4 100%)',
    icon: '⚙️',
  },
  {
    id: 7,
    category: 'Web Development',
    tag: 'Web Dev',
    title: 'React vs Next.js in 2025: Which One Should You Build With?',
    excerpt: 'Both are powerful. But choosing the wrong one for your project can cost you months of refactoring. Here\'s our definitive take after building dozens of projects.',
    author: 'Muhammad Ahmad',
    role: 'AI Developer',
    date: 'Feb 26, 2025',
    readTime: '6 min read',
    featured: false,
    gradient: 'linear-gradient(135deg, #091060 0%, #1a2a9c 100%)',
    icon: '⚛️',
  },
  {
    id: 8,
    category: 'Social Media',
    tag: 'Social Media',
    title: 'How We Grew a Pakistani Brand to 100K Followers in 90 Days',
    excerpt: 'A behind-the-scenes breakdown of the exact content strategy, posting schedule, and engagement tactics we used to hit 100K organic followers in just three months.',
    author: 'Hira Khalid',
    role: 'Social Media Manager',
    date: 'Feb 18, 2025',
    readTime: '9 min read',
    featured: false,
    gradient: 'linear-gradient(135deg, #091060 0%, #06b6d4 100%)',
    icon: '🚀',
  },
];

const POPULAR = POSTS.slice(0, 4);

/* ─── Sub-components ──────────────────────────────────────── */

function CategoryTag({ tag }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 12px',
      borderRadius: '50px',
      fontSize: '0.68rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      background: 'rgba(6,182,212,0.12)',
      color: '#06b6d4',
      border: '1px solid rgba(6,182,212,0.25)',
    }}>
      {tag}
    </span>
  );
}

function AuthorChip({ author, role, date, readTime }) {
  const initials = author.split(' ').map(w => w[0]).join('').slice(0, 2);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 34, height: 34, borderRadius: '50%',
        background: 'linear-gradient(135deg,#091060,#06b6d4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.68rem', fontWeight: 800, color: '#fff', flexShrink: 0,
        border: '1.5px solid rgba(6,182,212,0.3)',
      }}>
        {initials}
      </div>
      <div>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', lineHeight: 1.2 }}>{author}</div>
        <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.2 }}>{date} · {readTime}</div>
      </div>
    </div>
  );
}

/* ─── Featured post (large, full-width) ── */
function FeaturedCard({ post }) {
  const [hovered, setHovered] = useState(false);
  return (
    <article
      className="blog-featured-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transform: hovered ? 'translateY(-4px)' : 'none' }}
    >
      {/* Left: gradient visual */}
      <div className="blog-featured-visual" style={{ background: post.gradient }}>
        <div className="blog-featured-icon">{post.icon}</div>
        <div className="blog-featured-badge">Featured</div>
        {/* Grid texture overlay */}
        <div className="blog-visual-grid" />
      </div>

      {/* Right: content */}
      <div className="blog-featured-content">
        <CategoryTag tag={post.tag} />
        <h2 className="blog-featured-title">{post.title}</h2>
        <p className="blog-featured-excerpt">{post.excerpt}</p>
        <div style={{ marginTop: 'auto', paddingTop: 24 }}>
          <AuthorChip author={post.author} role={post.role} date={post.date} readTime={post.readTime} />
          <Link to={`/blog/${post.id}`} className="blog-read-more mt-4 d-inline-flex">
            Read Article <i className="bi bi-arrow-right ms-2" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ─── Regular post card ── */
function PostCard({ post, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add('blog-card-visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="blog-post-card"
      style={{ transitionDelay: `${delay}ms`, transform: hovered ? 'translateY(-8px) scale(1.015)' : 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual header */}
      <div className="blog-card-visual" style={{ background: post.gradient }}>
        <div className="blog-card-icon">{post.icon}</div>
        <div className="blog-visual-grid" />
        {/* Shine sweep on hover */}
        <div className="blog-card-shine" style={{ opacity: hovered ? 1 : 0 }} />
      </div>

      {/* Content */}
      <div className="blog-card-body">
        <div style={{ marginBottom: 12 }}>
          <CategoryTag tag={post.tag} />
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <AuthorChip author={post.author} role={post.role} date={post.date} readTime={post.readTime} />
          <Link
            to={`/blog/${post.id}`}
            className="blog-card-link"
            style={{ color: hovered ? '#fff' : 'rgba(255,255,255,0.4)' }}
          >
            Read More <i className="bi bi-arrow-right ms-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ─── Sidebar: Newsletter ── */
function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="blog-sidebar-box">
      <div className="blog-sidebar-box__icon">✉️</div>
      <h5 className="blog-sidebar-box__title">Stay in the Loop</h5>
      <p className="blog-sidebar-box__desc">
        Get the latest insights on AI, digital marketing, and growth strategies — straight to your inbox.
      </p>
      {sent ? (
        <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)', color: '#06b6d4', fontSize: '0.82rem', textAlign: 'center' }}>
          ✅ You're in! Watch your inbox.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="blog-sidebar-input"
          />
          <button className="blog-sidebar-btn" onClick={() => email && setSent(true)}>
            Subscribe Free
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Sidebar: Popular posts ── */
function PopularPosts() {
  return (
    <div className="blog-sidebar-box">
      <h5 className="blog-sidebar-box__title" style={{ marginBottom: 20 }}>Popular Posts</h5>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {POPULAR.map((p, i) => (
          <Link key={p.id} to={`/blog/${p.id}`} className="blog-popular-item">
            <span className="blog-popular-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div className="blog-popular-title">{p.title}</div>
              <div className="blog-popular-meta">{p.date} · {p.readTime}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── Sidebar: Topics ── */
function TopicCloud() {
  return (
    <div className="blog-sidebar-box">
      <h5 className="blog-sidebar-box__title" style={{ marginBottom: 16 }}>Browse Topics</h5>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {CATEGORIES.filter(c => c !== 'All').map(cat => (
          <span key={cat} className="blog-topic-pill">{cat}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────── */
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount]     = useState(6);

  const filtered = activeCategory === 'All'
    ? POSTS.filter(p => !p.featured)
    : POSTS.filter(p => !p.featured && p.category === activeCategory);

  const featured = POSTS.find(p => p.featured);
  const visible  = filtered.slice(0, visibleCount);

  return (
    <>
      {/* ════ PAGE HERO BANNER ════ */}
      <section className="vc-page-hero blog-hero">
        <div className="vc-corner vc-corner--tl" />
        <div className="vc-corner vc-corner--br" />
        {/* animated dots */}
        <div className="blog-hero-dots" aria-hidden="true" />
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <span className="blog-hero-eyebrow">Insights & Resources</span>
          <h1 className="vc-page-hero__title">THE BLOG</h1>
          <p className="blog-hero-sub">
            AI breakthroughs, marketing strategy, design thinking — no fluff, just value.
          </p>
        </Container>
      </section>

      {/* ════ CATEGORY FILTER TABS ════ */}
      <div className="blog-filter-bar">
        <Container>
          <div className="blog-filter-inner">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`blog-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* ════ MAIN CONTENT ════ */}
      <section className="blog-main-section">
        <Container>
          <Row className="g-5">

            {/* ── Left / Main column ── */}
            <Col lg={8}>

              {/* Featured post (only when showing All) */}
              {activeCategory === 'All' && featured && (
                <div style={{ marginBottom: 48 }}>
                  <div className="blog-section-label">Featured Article</div>
                  <FeaturedCard post={featured} />
                </div>
              )}

              {/* Grid */}
              {visible.length > 0 ? (
                <>
                  <div className="blog-section-label" style={{ marginBottom: 24 }}>
                    {activeCategory === 'All' ? 'Latest Articles' : activeCategory}
                    <span className="blog-count-badge">{filtered.length}</span>
                  </div>
                  <div className="blog-grid">
                    {visible.map((post, i) => (
                      <PostCard key={post.id} post={post} delay={i * 60} />
                    ))}
                  </div>

                  {/* Load more */}
                  {visibleCount < filtered.length && (
                    <div style={{ textAlign: 'center', marginTop: 48 }}>
                      <button
                        className="blog-load-more"
                        onClick={() => setVisibleCount(v => v + 3)}
                      >
                        Load More Articles
                        <i className="bi bi-arrow-down ms-2" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="blog-empty">
                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📭</div>
                  <p>No articles in this category yet. Check back soon!</p>
                </div>
              )}
            </Col>

            {/* ── Right / Sidebar ── */}
            <Col lg={4}>
              <div className="blog-sidebar">
                <NewsletterBox />
                <PopularPosts />
                <TopicCloud />

                {/* CTA box */}
                <div className="blog-sidebar-cta">
                  <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>🚀</div>
                  <h5 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem', marginBottom: 10 }}>
                    Ready to Grow Your Business?
                  </h5>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 18 }}>
                    Let's build something extraordinary together.
                  </p>
                  <Link to="/contact" className="blog-sidebar-btn d-inline-flex align-items-center gap-2">
                    Get a Free Strategy Call <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ════ SCOPED STYLES ════ */}
      <style>{`
        /* ── Hero extras ── */
        .blog-hero { padding-bottom: clamp(50px, 7vw, 80px); }
        .blog-hero-eyebrow {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #06b6d4;
          margin-bottom: 14px;
        }
        .blog-hero-sub {
          font-size: clamp(0.9rem, 1.8vw, 1.1rem);
          color: rgba(255,255,255,0.45);
          margin-top: 18px;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.75;
        }
        /* animated dots overlay on hero */
        .blog-hero-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 1;
        }

        /* ── Filter bar ── */
        .blog-filter-bar {
          background: rgba(0,0,0,0.8);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(16px);
          position: sticky;
          top: 64px;
          z-index: 100;
          padding: 0;
        }
        .blog-filter-inner {
          display: flex;
          align-items: center;
          gap: 4px;
          overflow-x: auto;
          padding: 14px 0;
          scrollbar-width: none;
        }
        .blog-filter-inner::-webkit-scrollbar { display: none; }
        .blog-filter-btn {
          flex-shrink: 0;
          padding: 8px 18px;
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-family: 'Poppins', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.22s ease;
          white-space: nowrap;
        }
        .blog-filter-btn:hover {
          border-color: rgba(6,182,212,0.3);
          color: #fff;
          background: rgba(9,16,96,0.25);
        }
        .blog-filter-btn.active {
          background: linear-gradient(135deg, #091060, #1a2a9c 60%, #06b6d4);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 4px 18px rgba(9,16,96,0.45);
        }

        /* ── Main section ── */
        .blog-main-section {
          background: #000;
          padding: clamp(60px, 9vw, 100px) 0;
          min-height: 60vh;
        }

        /* Section labels */
        .blog-section-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .blog-count-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(9,16,96,0.6);
          border: 1px solid rgba(6,182,212,0.2);
          color: #06b6d4;
          font-size: 0.65rem;
          font-weight: 700;
        }

        /* ── Featured card ── */
        .blog-featured-card {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          background: #080d1e;
          transition: transform 0.35s cubic-bezier(0,0,0.2,1),
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
          min-height: 380px;
        }
        .blog-featured-card:hover {
          box-shadow: 0 30px 70px rgba(0,0,0,0.55), 0 0 50px rgba(9,16,96,0.25);
          border-color: rgba(6,182,212,0.18);
        }
        .blog-featured-visual {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .blog-featured-icon {
          font-size: 5rem;
          filter: drop-shadow(0 0 30px rgba(255,255,255,0.15));
          z-index: 2;
          position: relative;
          animation: blogIconFloat 5s ease-in-out infinite;
        }
        @keyframes blogIconFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        .blog-featured-badge {
          position: absolute;
          top: 18px; left: 18px;
          padding: 5px 14px;
          border-radius: 50px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
          z-index: 3;
        }
        .blog-featured-content {
          padding: 40px;
          display: flex;
          flex-direction: column;
        }
        .blog-featured-title {
          font-size: clamp(1.2rem, 2.2vw, 1.6rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.3;
          margin: 14px 0 16px;
          letter-spacing: -0.01em;
        }
        .blog-featured-excerpt {
          font-size: 0.86rem;
          color: rgba(255,255,255,0.48);
          line-height: 1.8;
          flex: 1;
          margin-bottom: 0;
        }

        /* ── Post grid ── */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        /* ── Post card ── */
        .blog-post-card {
          background: #080d1e;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(24px);
          transition: transform 0.38s cubic-bezier(0,0,0.2,1),
                      box-shadow 0.38s ease,
                      border-color 0.38s ease,
                      opacity 0.55s ease;
          cursor: pointer;
        }
        .blog-post-card.blog-card-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .blog-post-card:hover {
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(9,16,96,0.2);
          border-color: rgba(6,182,212,0.15);
        }

        /* Card visual */
        .blog-card-visual {
          position: relative;
          height: 168px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .blog-card-icon {
          font-size: 3.2rem;
          z-index: 2;
          position: relative;
          filter: drop-shadow(0 0 20px rgba(255,255,255,0.12));
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .blog-post-card:hover .blog-card-icon {
          transform: scale(1.15) translateY(-4px);
        }

        /* Shine sweep */
        .blog-card-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 25%,
            rgba(255,255,255,0.06) 50%,
            transparent 75%
          );
          transform: translateX(-100%);
          animation: blogShine 0.6s ease forwards;
          pointer-events: none;
          z-index: 3;
        }
        @keyframes blogShine {
          to { transform: translateX(200%); }
        }

        /* Grid texture on visuals */
        .blog-visual-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 1;
        }

        /* Card body */
        .blog-card-body {
          padding: 22px 22px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .blog-card-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.45;
          margin: 10px 0 10px;
          letter-spacing: -0.005em;
        }
        .blog-card-excerpt {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.42);
          line-height: 1.75;
          flex: 1;
          margin-bottom: 0;
        }
        .blog-card-link {
          display: inline-flex;
          align-items: center;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-decoration: none;
          margin-top: 16px;
          transition: color 0.2s ease, gap 0.2s ease;
        }

        /* Read more link on featured */
        .blog-read-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 26px;
          border-radius: 50px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          background: linear-gradient(135deg, #091060, #1a2a9c 60%, #06b6d4);
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease;
        }
        .blog-read-more:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(9,16,96,0.5);
          color: #fff;
        }

        /* Load more */
        .blog-load-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 36px;
          border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,0.12);
          background: rgba(9,16,96,0.2);
          color: rgba(255,255,255,0.65);
          font-family: 'Poppins', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }
        .blog-load-more:hover {
          border-color: rgba(6,182,212,0.35);
          color: #fff;
          background: rgba(9,16,96,0.4);
          transform: translateY(-2px);
        }

        /* Empty state */
        .blog-empty {
          text-align: center;
          padding: 80px 20px;
          color: rgba(255,255,255,0.3);
          font-size: 0.9rem;
        }

        /* ── Sidebar ── */
        .blog-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: sticky;
          top: 120px;
        }
        .blog-sidebar-box {
          background: #080d1e;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 28px 24px;
          position: relative;
          overflow: hidden;
        }
        .blog-sidebar-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent);
        }
        .blog-sidebar-box__icon { font-size: 1.8rem; margin-bottom: 12px; display: block; }
        .blog-sidebar-box__title {
          font-size: 1rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 10px;
        }
        .blog-sidebar-box__desc {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.42);
          line-height: 1.75;
          margin-bottom: 18px;
        }
        .blog-sidebar-input {
          width: 100%;
          padding: 11px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: #fff;
          font-family: 'Poppins', sans-serif;
          font-size: 0.82rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .blog-sidebar-input:focus {
          border-color: rgba(6,182,212,0.3);
          box-shadow: 0 0 0 3px rgba(9,16,96,0.3);
        }
        .blog-sidebar-input::placeholder { color: rgba(255,255,255,0.25); }
        .blog-sidebar-btn {
          width: 100%;
          padding: 12px 20px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #091060, #1a2a9c 60%, #06b6d4);
          color: #fff;
          font-family: 'Poppins', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease;
        }
        .blog-sidebar-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(9,16,96,0.5);
          color: #fff;
        }

        /* Popular posts */
        .blog-popular-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          text-decoration: none;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: gap 0.2s ease;
        }
        .blog-popular-item:last-child { border-bottom: none; }
        .blog-popular-item:hover { gap: 18px; }
        .blog-popular-num {
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--bp-cyan, #06b6d4);
          letter-spacing: 0.05em;
          min-width: 22px;
          margin-top: 2px;
        }
        .blog-popular-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          line-height: 1.45;
          transition: color 0.2s ease;
        }
        .blog-popular-item:hover .blog-popular-title { color: #fff; }
        .blog-popular-meta {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.32);
          margin-top: 3px;
        }

        /* Topic pills */
        .blog-topic-pill {
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.72rem;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          background: rgba(9,16,96,0.2);
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .blog-topic-pill:hover {
          background: rgba(9,16,96,0.5);
          border-color: rgba(6,182,212,0.25);
          color: #fff;
        }

        /* CTA sidebar box */
        .blog-sidebar-cta {
          background: linear-gradient(135deg, rgba(9,16,96,0.7) 0%, rgba(9,16,96,0.4) 100%);
          border: 1px solid rgba(6,182,212,0.15);
          border-radius: 18px;
          padding: 28px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .blog-sidebar-cta::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent);
        }

        /* ── Responsive ── */
        @media (max-width: 767.98px) {
          .blog-featured-card { grid-template-columns: 1fr; }
          .blog-featured-visual { height: 200px; }
          .blog-featured-content { padding: 24px; }
          .blog-grid { grid-template-columns: 1fr; }
          .blog-sidebar { position: static; }
        }
      `}</style>
    </>
  );
}
