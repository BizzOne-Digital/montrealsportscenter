import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconMapPin, IconMail, IconPhone, IconInstagram, IconFacebook, IconTwitter, IconBasketball } from '../common/Icons';
import { pick } from '../../utils/localize';
import './Footer.css';

export default function Footer({ settings }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
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
                <div className="footer-tagline">{settings ? pick(settings, 'tagline', lang) : 'The Home of Basketball in the West Island'}</div>
              </div>
            </div>
            <p className="footer-desc">{t('footer.description')}</p>
            <div className="footer-socials">
              {settings?.socialLinks?.instagram && <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><IconInstagram /></a>}
              {settings?.socialLinks?.facebook && <a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><IconFacebook /></a>}
              {settings?.socialLinks?.twitter && <a href={settings.socialLinks.twitter} target="_blank" rel="noreferrer" aria-label="Twitter"><IconTwitter /></a>}
            </div>
          </div>
          <div className="footer-links-col">
            <h4>{t('footer.programsHeading')}</h4>
            <ul>
              <li><Link to="/programs">{t('footer.courtRentals')}</Link></li>
              <li><Link to="/programs">{t('footer.youthAcademy')}</Link></li>
              <li><Link to="/programs">{t('footer.campsClinics')}</Link></li>
              <li><Link to="/programs">{t('footer.leaguesTournaments')}</Link></li>
            </ul>
          </div>
          <div className="footer-links-col">
            <h4>{t('footer.communityHeading')}</h4>
            <ul>
              <li><Link to="/programs">{t('footer.schoolPartnerships')}</Link></li>
              <li><Link to="/programs">{t('footer.birthdayParties')}</Link></li>
              <li><Link to="/programs">{t('footer.corporateEvents')}</Link></li>
              <li><Link to="/partners">{t('footer.sponsorships')}</Link></li>
              <li><Link to="/blog">{t('footer.newsUpdates')}</Link></li>
            </ul>
          </div>
          <div className="footer-contact-col">
            <h4>{t('footer.contactHeading')}</h4>
            <ul>
              {settings?.email && <li><IconMail size={15} /><a href={`mailto:${settings.email}`}>{settings.email}</a></li>}
              {settings?.phone && <li><IconPhone size={15} /><a href={`tel:${settings.phone}`}>{settings.phone}</a></li>}
              {settings?.address && <li><IconMapPin size={15} /><span>{pick(settings, 'address', lang)}</span></li>}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {year} Montreal Sports Center. {t('footer.rightsReserved')}</p>
          <p className="footer-credit">{t('footer.poweredBy')}</p>
        </div>
      </div>
    </footer>
  );
}
