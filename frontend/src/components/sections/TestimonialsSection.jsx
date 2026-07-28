import { IconStar } from '../common/Icons';
import Reveal from '../common/Reveal';
import './TestimonialsSection.css';

const AVATAR_COLORS = ['#0e2254', '#ea580c', '#059669', '#7c3aed', '#1d4ed8'];

export default function TestimonialsSection({ testimonials }) {
  if (!testimonials?.length) return null;
  return (
    <section className="section testimonials-section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">Testimonials</div>
          <h2>What the community <span className="text-orange">is saying.</span></h2>
        </Reveal>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <Reveal as="div" key={t._id} delay={i * 70} className={`testimonial-card ${t.isFeatured ? 'featured' : ''}`}>
              <div className="tc-stars">
                {Array.from({ length: 5 }).map((_, si) => (
                  <IconStar key={si} size={16} color="#f97316" filled={si < (t.rating || 5)} />
                ))}
              </div>
              <p className="tc-text">"{t.text}"</p>
              <div className="tc-author">
                {t.avatar
                  ? <img src={t.avatar} alt={t.name} className="tc-avatar" />
                  : <div className="tc-avatar-placeholder" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                      {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                }
                <div>
                  <div className="tc-name">{t.name}</div>
                  <div className="tc-role">{t.role}</div>
                </div>
              </div>
              {t.program && <div className="tc-program">{t.program}</div>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
