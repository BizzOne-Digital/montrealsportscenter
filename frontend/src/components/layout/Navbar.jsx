import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconMenu, IconX } from '../common/Icons';
import { pick } from '../../utils/localize';
import './Navbar.css';

const NAV_LINKS = [
  { key: 'programs', href: '/programs' },
  { key: 'facility', href: '/facility' },
  { key: 'memberships', href: '/memberships' },
  { key: 'partners', href: '/partners' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
];

export default function Navbar({ settings, hasAnnouncement }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
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
            <span className="logo-sub">{pick(settings, 'tagline', lang) || 'The Home of Basketball in the West Island'}</span>
          </div>
        </Link>

        <nav className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(link => (
            <Link key={link.key} to={link.href} className="nav-link" onClick={() => setMenuOpen(false)}>
              {t(`nav.${link.key}`)}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary btn-sm nav-cta">{t('nav.cta')}</Link>
          <div className="lang-toggle">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => i18n.changeLanguage('en')}>{t('nav.langEn')}</button>
            <span>|</span>
            <button className={lang === 'fr' ? 'active' : ''} onClick={() => i18n.changeLanguage('fr')}>{t('nav.langFr')}</button>
          </div>
        </nav>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={t('nav.toggleMenu')}>
          {menuOpen ? <IconX size={22} /> : <IconMenu size={22} />}
        </button>
      </div>
    </header>
  );
}
