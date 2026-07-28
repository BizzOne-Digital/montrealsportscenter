import { useEffect, useRef, useState } from 'react';
import { IconArrowRight, IconBasketball, IconCheck } from '../common/Icons';
import './HeroSection.css';

const HERO_BG = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1800&q=80&auto=format&fit=crop';

export default function HeroSection({ hero }) {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    // Particle animation on canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrameId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: -Math.random() * 0.5 - 0.2,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      });
      animFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animFrameId); window.removeEventListener('resize', resize); };
  }, []);

  const stats = hero?.stats || [
    { value: '10,000+', label: 'sq. ft. court-focused facility' },
    { value: '5–18', label: 'youth academy age focus' },
    { value: '7 Days', label: 'programming for the community' },
  ];

  return (
    <section className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${hero?.backgroundImage || HERO_BG})` }}
      />
      <div className="hero-overlay" />
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className={`container hero-content ${loaded ? 'loaded' : ''}`}>
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot">
              <IconBasketball size={14} color="#f97316" />
            </span>
            <span>{hero?.badge || 'Year-round indoor basketball center'}</span>
          </div>

          <h1 className="hero-headline">
            {(hero?.headline || 'Train. Play.\nCompete. Belong.').split('\n').map((line, i) => (
              <span key={i} className="headline-line" style={{ animationDelay: `${i * 0.15}s` }}>
                {line}
              </span>
            ))}
          </h1>

          <p className="hero-sub">
            {hero?.subheadline || 'Montreal Sports Center is a safe, professionally managed indoor sports hub for youth, families, schools, teams, coaches, and community organizations across the West Island.'}
          </p>

          <div className="hero-features">
            {['Safe & professionally managed', 'Open 7 days a week', 'All skill levels welcome'].map(f => (
              <div key={f} className="hero-feature">
                <span className="feature-check"><IconCheck size={12} color="#f97316" /></span>
                {f}
              </div>
            ))}
          </div>

          <div className="hero-cta">
            <a href={hero?.primaryBtnLink || '/contact'} className="btn btn-primary btn-lg">
              {hero?.primaryBtnText || 'Book / Inquire'}
              <IconArrowRight size={18} />
            </a>
            <a href={hero?.secondaryBtnLink || '/programs'} className="btn hero-btn-ghost btn-lg">
              {hero?.secondaryBtnText || 'Explore Programs'}
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="mission-card">
            <div className="mission-rings">
              <div className="ring ring-1" />
              <div className="ring ring-2" />
              <div className="ring ring-3" />
            </div>
            <div className="mission-content">
              <div className="mission-label">
                <IconBasketball size={14} color="#f97316" />
                <span>{hero?.mission?.title || 'MSC MISSION'}</span>
              </div>
              <p>{hero?.mission?.text || 'Build better players, stronger families, and a connected community.'}</p>
            </div>
          </div>

          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
