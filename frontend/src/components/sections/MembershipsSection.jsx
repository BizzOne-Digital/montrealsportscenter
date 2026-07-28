import { Link } from 'react-router-dom';
import { IconCheck, IconArrowRight } from '../common/Icons';
import Reveal from '../common/Reveal';
import './MembershipsSection.css';

const TIER_COLORS = {
  bronze: { bg: '#fff7ed', accent: '#ea580c', border: '#fed7aa' },
  silver: { bg: '#eff6ff', accent: '#1d4ed8', border: '#bfdbfe' },
  gold: { bg: '#fefce8', accent: '#ca8a04', border: '#fde68a' },
};

export default function MembershipsSection({ memberships }) {
  if (!memberships?.length) return null;
  return (
    <section className="section memberships-section" id="memberships">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">Memberships</div>
          <h2>Flexible options for players<br />and <span className="text-orange">families.</span></h2>
          <p className="section-desc">Choose the plan that fits your goals. All memberships include community access and priority booking.</p>
        </Reveal>
        <div className="memberships-grid">
          {memberships.map((m, i) => {
            const colors = TIER_COLORS[m.tier] || TIER_COLORS.silver;
            return (
              <Reveal as="div" key={m._id} delay={i * 80} className={`membership-card ${m.isPopular ? 'popular' : ''}`}>
                {m.isPopular && <div className="popular-badge">Most Popular</div>}
                <div className="mc-header">
                  <div className="mc-tier-badge" style={{ background: colors.bg, color: colors.accent, border: `1px solid ${colors.border}` }}>
                    {m.badge}
                  </div>
                  <h3 className="mc-name">{m.name}</h3>
                  <div className="mc-price">
                    <span className="mc-from">From</span>
                    <span className="mc-amount">${m.price}</span>
                    <span className="mc-per">/{m.period}</span>
                  </div>
                  <p className="mc-desc">{m.description}</p>
                </div>
                <ul className="mc-features">
                  {m.features?.map((f, i) => (
                    <li key={i}>
                      <span className="mc-check" style={{ background: colors.bg, color: colors.accent }}><IconCheck size={13} /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`btn mc-cta ${m.isPopular ? 'btn-primary' : 'btn-outline'}`}>
                  {m.ctaText}
                  <IconArrowRight size={15} />
                </Link>
              </Reveal>
            );
          })}
        </div>
        <p className="memberships-note">Final pricing and benefits will be confirmed before launch. Contact us to join the founding members list.</p>
      </div>
    </section>
  );
}
