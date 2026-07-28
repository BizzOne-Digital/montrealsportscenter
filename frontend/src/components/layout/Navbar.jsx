import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconMenu, IconX } from '../common/Icons';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Programs', href: '/programs' },
  { label: 'Facility', href: '/facility' },
  { label: 'Memberships', href: '/memberships' },
  { label: 'Partners', href: '/partners' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar({ settings, hasAnnouncement }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) { setScrolled(false); return; }
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header className={`navbar ${(scrolled || !isHome) ? 'scrolled' : ''}`} style={{ top: hasAnnouncement ? '30px' : 0 }}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          {settings?.logo
            ? <img src={settings.logo} alt={settings.siteName} className="logo-img" />
            : <div className="logo-mark"><span>MSC</span></div>
          }
          <div className="logo-text">
            <span className="logo-name">{settings?.siteName || 'Montreal Sports Center'}</span>
            <span className="logo-sub">{settings?.tagline || 'The Home of Basketball in the West Island'}</span>
          </div>
        </Link>

        <nav className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(link => (
            <Link key={link.label} to={link.href} className="nav-link" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary btn-sm nav-cta">Join the Interest List</Link>
        </nav>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <IconX size={22} /> : <IconMenu size={22} />}
        </button>
      </div>
    </header>
  );
}
