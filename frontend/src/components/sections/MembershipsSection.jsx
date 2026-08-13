import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconCheck, IconArrowRight } from '../common/Icons';
import Reveal from '../common/Reveal';
import { pick } from '../../utils/localize';
import './MembershipsSection.css';

const TIER_COLORS = {
  bronze: { bg: '#fff7ed', accent: '#ea580c', border: '#fed7aa' },
  silver: { bg: '#eff6ff', accent: '#1d4ed8', border: '#bfdbfe' },
  gold: { bg: '#fefce8', accent: '#ca8a04', border: '#fde68a' },
};

export default function MembershipsSection({ memberships }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  if (!memberships?.length) return null;
  return (
    <section className="section memberships-section" id="memberships">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">{t('memberships.label')}</div>
          <h2>{t('memberships.headline1')}<br />{t('memberships.headline2')} <span className="text-orange">{t('memberships.headline3')}</span></h2>
          <p className="section-desc">{t('memberships.description')}</p>
        </Reveal>
        <div className="memberships-grid">
          {memberships.map((m, i) => {
            const colors = TIER_COLORS[m.tier] || TIER_COLORS.silver;
            return (
              <Reveal as="div" key={m._id} delay={i * 80} className={`membership-card ${m.isPopular ? 'popular' : ''}`}>
                {m.isPopular && <div className="popular-badge">{t('memberships.mostPopular')}</div>}
                <div className="mc-header">
                  <div className="mc-tier-badge" style={{ background: colors.bg, color: colors.accent, border: `1px solid ${colors.border}` }}>
                    {pick(m, 'badge', lang)}
                  </div>
                  <h3 className="mc-name">{m.name}</h3>
                  <div className="mc-price">
                    <span className="mc-from">{t('memberships.from')}</span>
                    <span className="mc-amount">${m.price}</span>
                    <span className="mc-per">/{m.period}</span>
                  </div>
                  <p className="mc-desc">{pick(m, 'description', lang)}</p>
                </div>
                <ul className="mc-features">
                  {pick(m, 'features', lang)?.map((f, i) => (
                    <li key={i}>
                      <span className="mc-check" style={{ background: colors.bg, color: colors.accent }}><IconCheck size={13} /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`btn mc-cta ${m.isPopular ? 'btn-primary' : 'btn-outline'}`}>
                  {pick(m, 'ctaText', lang)}
                  <IconArrowRight size={15} />
                </Link>
              </Reveal>
            );
          })}
        </div>
        <p className="memberships-note">{t('memberships.note')}</p>
      </div>
    </section>
  );
}
