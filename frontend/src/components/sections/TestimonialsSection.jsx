import { useTranslation } from 'react-i18next';
import { IconStar } from '../common/Icons';
import Reveal from '../common/Reveal';
import { pick } from '../../utils/localize';
import './TestimonialsSection.css';

const AVATAR_COLORS = ['#0e2254', '#ea580c', '#059669', '#7c3aed', '#1d4ed8'];

export default function TestimonialsSection({ testimonials }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  if (!testimonials?.length) return null;
  return (
    <section className="section testimonials-section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">{t('testimonials.label')}</div>
          <h2>{t('testimonials.headline1')} <span className="text-orange">{t('testimonials.headline2')}</span></h2>
        </Reveal>
        <div className="testimonials-grid">
          {testimonials.map((item, i) => (
            <Reveal as="div" key={item._id} delay={i * 70} className={`testimonial-card ${item.isFeatured ? 'featured' : ''}`}>
              <div className="tc-stars">
                {Array.from({ length: 5 }).map((_, si) => (
                  <IconStar key={si} size={16} color="#f97316" filled={si < (item.rating || 5)} />
                ))}
              </div>
              <p className="tc-text">"{pick(item, 'text', lang)}"</p>
              <div className="tc-author">
                {item.avatar
                  ? <img src={item.avatar} alt={item.name} className="tc-avatar" />
                  : <div className="tc-avatar-placeholder" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                      {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                }
                <div>
                  <div className="tc-name">{item.name}</div>
                  <div className="tc-role">{pick(item, 'role', lang)}</div>
                </div>
              </div>
              {item.program && <div className="tc-program">{pick(item, 'program', lang)}</div>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
