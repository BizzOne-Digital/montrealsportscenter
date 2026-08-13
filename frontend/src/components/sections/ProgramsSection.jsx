import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProgramIcon, IconArrowRight, IconCheck } from '../common/Icons';
import Reveal from '../common/Reveal';
import { pick } from '../../utils/localize';
import './ProgramsSection.css';

const UNSPLASH = {
  rental: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&q=75&auto=format',
  academy: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=600&q=75&auto=format',
  league: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=75&auto=format',
  camp: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=75&auto=format',
  event: 'https://images.unsplash.com/photo-1527452820659-5a90cc79f2da?w=600&q=75&auto=format',
  partnership: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=600&q=75&auto=format',
};

export default function ProgramsSection({ programs }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activeIdx, setActiveIdx] = useState(0);
  const active = programs?.[activeIdx];

  if (!programs?.length) return null;

  return (
    <section className="section programs-section" id="programs">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">{t('programs.label')}</div>
          <h2>{t('programs.headline1')}<br /><span className="text-orange">{t('programs.headline2')}</span></h2>
          <p className="section-desc">{t('programs.description')}</p>
        </Reveal>

        <div className="programs-tabs">
          {programs.map((p, i) => (
            <button
              key={p._id}
              className={`program-tab ${i === activeIdx ? 'active' : ''}`}
              onClick={() => setActiveIdx(i)}
            >
              <span className="tab-icon">{getProgramIcon(p.icon, 18, i === activeIdx ? '#f97316' : '#64748b')}</span>
              {pick(p, 'title', lang)}
            </button>
          ))}
        </div>

        {active && (
          <Reveal as="div" className="program-showcase">
            <div className="showcase-image">
              <img
                src={active.image || UNSPLASH[active.category] || UNSPLASH.rental}
                alt={pick(active, 'title', lang)}
                loading="lazy"
              />
              <div className="showcase-image-overlay">
                <div className="showcase-icon">{getProgramIcon(active.icon, 40, 'white')}</div>
              </div>
            </div>
            <div className="showcase-info">
              <div className="showcase-badge badge badge-orange">{active.category}</div>
              <h3>{pick(active, 'title', lang)}</h3>
              <p>{pick(active, 'description', lang)}</p>
              <ul className="showcase-features">
                {pick(active, 'features', lang)?.map((f, i) => (
                  <li key={i}>
                    <span className="feature-icon"><IconCheck size={14} color="#f97316" /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-primary mt-3">
                {t('programs.inquireButton')}
                <IconArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        )}

        <div className="programs-grid">
          {programs.map((p, i) => (
            <Reveal as="div" key={p._id} delay={i * 60} className="program-card card" onClick={() => setActiveIdx(i)}>
              <div className="program-card-img">
                <img src={p.image || UNSPLASH[p.category] || UNSPLASH.rental} alt={pick(p, 'title', lang)} loading="lazy" />
                <div className="program-card-icon">{getProgramIcon(p.icon, 24, 'white')}</div>
              </div>
              <div className="program-card-body">
                <h4>{pick(p, 'title', lang)}</h4>
                <p>{pick(p, 'description', lang)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
