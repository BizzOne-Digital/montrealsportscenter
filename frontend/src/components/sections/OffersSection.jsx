import { IconArrowRight, IconZap } from '../common/Icons';
import Reveal from '../common/Reveal';
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
  if (!offers?.length) return null;
  return (
    <section className="section offers-section" id="offers">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">Special Offers</div>
          <h2>Launch deals you <span className="text-orange">won't want to miss.</span></h2>
          <p className="section-desc">Take advantage of our founding period offers before they expire. These rates won't last once we open.</p>
        </Reveal>
        <div className="offers-grid">
          {offers.map((offer, i) => {
            const style = BADGE_STYLES[offer.badgeColor] || BADGE_STYLES.orange;
            return (
              <Reveal as="div" key={offer._id} delay={i * 70} className={`offer-card ${offer.isFeatured ? 'featured' : ''}`}>
                <div className="offer-img">
                  <img src={offer.image || OFFER_IMAGES[i % OFFER_IMAGES.length]} alt={offer.title} loading="lazy" />
                  <div className="offer-badge" style={{ background: style.bg, color: style.color }}>
                    <IconZap size={12} color={style.color} />
                    {offer.badgeText}
                  </div>
                  {offer.discount && <div className="offer-discount">{offer.discount}</div>}
                </div>
                <div className="offer-body">
                  <h4>{offer.title}</h4>
                  <p>{offer.description}</p>
                  {offer.validUntil && (
                    <div className="offer-expiry">
                      Expires: {new Date(offer.validUntil).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  )}
                  <a href={offer.ctaLink || '/contact'} className="btn btn-primary btn-sm offer-cta">
                    {offer.ctaText}
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
