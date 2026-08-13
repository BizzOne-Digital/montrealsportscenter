import { useTranslation } from 'react-i18next';
import { IconArrowRight, IconZap } from '../common/Icons';
import Reveal from '../common/Reveal';
import { pick } from '../../utils/localize';
import './OffersSection.css';

const OFFER_IMAGES = [
  'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=75&auto=format',
  'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&q=75&auto=format',
  'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600&q=75&auto=format',
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=75&auto=format',
];

const BADGE_STYLES = {
  orange: { bg: '#fff4ed', color: '#ea580c' },
  green: { bg: '#ecfdf5', color: '#059669' },
  blue: { bg: '#eff6ff', color: '#1d4ed8' },
  purple: { bg: '#f5f3ff', color: '#7c3aed' },
};

export default function OffersSection({ offers }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  if (!offers?.length) return null;
  return (
    <section className="section offers-section" id="offers">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">{t('offers.label')}</div>
          <h2>{t('offers.headline1')} <span className="text-orange">{t('offers.headline2')}</span></h2>
          <p className="section-desc">{t('offers.description')}</p>
        </Reveal>
        <div className="offers-grid">
          {offers.map((offer, i) => {
            const style = BADGE_STYLES[offer.badgeColor] || BADGE_STYLES.orange;
            return (
              <Reveal as="div" key={offer._id} delay={i * 70} className={`offer-card ${offer.isFeatured ? 'featured' : ''}`}>
                <div className="offer-img">
                  <img src={offer.image || OFFER_IMAGES[i % OFFER_IMAGES.length]} alt={pick(offer, 'title', lang)} loading="lazy" />
                  <div className="offer-badge" style={{ background: style.bg, color: style.color }}>
                    <IconZap size={12} color={style.color} />
                    {pick(offer, 'badgeText', lang)}
                  </div>
                  {offer.discount && <div className="offer-discount">{pick(offer, 'discount', lang)}</div>}
                </div>
                <div className="offer-body">
                  <h4>{pick(offer, 'title', lang)}</h4>
                  <p>{pick(offer, 'description', lang)}</p>
                  {offer.validUntil && (
                    <div className="offer-expiry">
                      {t('offers.expires')}: {new Date(offer.validUntil).toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  )}
                  <a href={offer.ctaLink || '/contact'} className="btn btn-primary btn-sm offer-cta">
                    {pick(offer, 'ctaText', lang)}
                    <IconArrowRight size={14} />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
