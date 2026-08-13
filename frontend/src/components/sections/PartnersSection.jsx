import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconArrowRight, IconBuilding, IconUsers, IconTarget, IconGift } from '../common/Icons';
import Reveal from '../common/Reveal';
import './PartnersSection.css';

const BG = 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1600&q=75&auto=format';

export default function PartnersSection() {
  const { t } = useTranslation();
  const PARTNER_TYPES = [
    { icon: <IconBuilding size={20} color="white" />, label: t('partners.types.schools') },
    { icon: <IconUsers size={20} color="white" />, label: t('partners.types.associations') },
    { icon: <IconTarget size={20} color="white" />, label: t('partners.types.corporateEvents') },
    { icon: <IconGift size={20} color="white" />, label: t('partners.types.sponsorships') },
  ];
  return (
    <section className="partners-section" id="partners">
      <div className="partners-bg" style={{ backgroundImage: `url(${BG})` }} />
      <div className="partners-overlay" />
      <Reveal as="div" className="container partners-content">
        <div className="section-label" style={{ color: 'var(--orange)' }}>{t('partners.label')}</div>
        <h2 style={{ color: 'white', maxWidth: 700 }}>
          {t('partners.headline1')}<br /><span className="text-orange">{t('partners.headline2')}</span>
        </h2>
        <p className="partners-desc">
          {t('partners.description')}
        </p>
        <div className="partner-types">
          {PARTNER_TYPES.map((pt) => (
            <div key={pt.label} className="partner-type-chip">
              <span className="pt-icon">{pt.icon}</span>
              {pt.label}
            </div>
          ))}
        </div>
        <div className="partners-cta">
          <Link to="/contact" className="btn btn-primary btn-lg">
            {t('partners.becomePartner')}
            <IconArrowRight size={18} />
          </Link>
          <Link to="/memberships" className="btn btn-secondary btn-lg">{t('partners.viewMemberships')}</Link>
        </div>
      </Reveal>
    </section>
  );
}
