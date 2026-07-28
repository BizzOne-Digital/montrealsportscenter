import { Link } from 'react-router-dom';
import { IconArrowRight, IconBuilding, IconUsers, IconTarget, IconGift } from '../common/Icons';
import Reveal from '../common/Reveal';
import './PartnersSection.css';

const PARTNER_TYPES = [
  { icon: <IconBuilding size={20} color="white" />, label: 'Schools' },
  { icon: <IconUsers size={20} color="white" />, label: 'Associations' },
  { icon: <IconTarget size={20} color="white" />, label: 'Corporate Events' },
  { icon: <IconGift size={20} color="white" />, label: 'Court Sponsorships' },
];

const BG = 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1600&q=75&auto=format';

export default function PartnersSection() {
  return (
    <section className="partners-section" id="partners">
      <div className="partners-bg" style={{ backgroundImage: `url(${BG})` }} />
      <div className="partners-overlay" />
      <Reveal as="div" className="container partners-content">
        <div className="section-label" style={{ color: 'var(--orange)' }}>Partnership Opportunities</div>
        <h2 style={{ color: 'white', maxWidth: 700 }}>
          Partner with MSC to support<br /><span className="text-orange">youth, sports, and community.</span>
        </h2>
        <p className="partners-desc">
          MSC welcomes conversations with schools, youth associations, basketball clubs, local businesses, municipalities, sponsors, and community organizations interested in programs, rentals, events, or long-term partnerships.
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
            Become a Partner
            <IconArrowRight size={18} />
          </Link>
          <Link to="/memberships" className="btn btn-secondary btn-lg">View Membership Options</Link>
        </div>
      </Reveal>
    </section>
  );
}
