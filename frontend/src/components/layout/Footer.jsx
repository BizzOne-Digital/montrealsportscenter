import { Link } from 'react-router-dom';
import { IconMapPin, IconMail, IconPhone, IconInstagram, IconFacebook, IconTwitter, IconBasketball } from '../common/Icons';
import './Footer.css';

export default function Footer({ settings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              {settings?.logo
                ? <img src={settings.logo} alt={settings?.siteName} />
                : <div className="footer-logo-mark"><span>MSC</span></div>
              }
              <div>
                <div className="footer-site-name">{settings?.siteName || 'Montreal Sports Center'}</div>
                <div className="footer-tagline">{settings?.tagline || 'The Home of Basketball in the West Island'}</div>
              </div>
            </div>
            <p className="footer-desc">A future indoor basketball and community sports center serving families, youth, schools, teams, coaches, and organizations across Montreal's West Island.</p>
            <div className="footer-socials">
              {settings?.socialLinks?.instagram && <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><IconInstagram /></a>}
              {settings?.socialLinks?.facebook && <a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><IconFacebook /></a>}
              {settings?.socialLinks?.twitter && <a href={settings.socialLinks.twitter} target="_blank" rel="noreferrer" aria-label="Twitter"><IconTwitter /></a>}
            </div>
          </div>
          <div className="footer-links-col">
            <h4>Programs</h4>
            <ul>
              <li><Link to="/programs">Court Rentals</Link></li>
              <li><Link to="/programs">Youth Academy</Link></li>
              <li><Link to="/programs">Camps &amp; Clinics</Link></li>
              <li><Link to="/programs">Leagues &amp; Tournaments</Link></li>
            </ul>
          </div>
          <div className="footer-links-col">
            <h4>Community</h4>
            <ul>
              <li><Link to="/programs">School Partnerships</Link></li>
              <li><Link to="/programs">Birthday Parties</Link></li>
              <li><Link to="/programs">Corporate Events</Link></li>
              <li><Link to="/partners">Sponsorships</Link></li>
              <li><Link to="/blog">News &amp; Updates</Link></li>
            </ul>
          </div>
          <div className="footer-contact-col">
            <h4>Contact</h4>
            <ul>
              {settings?.email && <li><IconMail size={15} /><a href={`mailto:${settings.email}`}>{settings.email}</a></li>}
              {settings?.phone && <li><IconPhone size={15} /><a href={`tel:${settings.phone}`}>{settings.phone}</a></li>}
              {settings?.address && <li><IconMapPin size={15} /><span>{settings.address}</span></li>}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {year} Montreal Sports Center. All rights reserved.</p>
          <p className="footer-credit">Powered by BizzOne Digital</p>
        </div>
      </div>
    </footer>
  );
}
