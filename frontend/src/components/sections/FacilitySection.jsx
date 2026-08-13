import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconShield, IconUsers, IconTarget, IconMapPin, IconCheck } from '../common/Icons';
import Reveal from '../common/Reveal';
import './FacilitySection.css';

const FACILITY_IMG = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80&auto=format';

export default function FacilitySection() {
  const { t } = useTranslation();
  const FEATURES = [
    { icon: <IconTarget size={20} color="#f97316" />, title: t('facility.features.layoutTitle'), desc: t('facility.features.layoutDesc') },
    { icon: <IconUsers size={20} color="#f97316" />, title: t('facility.features.familyTitle'), desc: t('facility.features.familyDesc') },
    { icon: <IconShield size={20} color="#f97316" />, title: t('facility.features.mgmtTitle'), desc: t('facility.features.mgmtDesc') },
    { icon: <IconMapPin size={20} color="#f97316" />, title: t('facility.features.hubTitle'), desc: t('facility.features.hubDesc') },
  ];
  return (
    <section className="section facility-section" id="facility">
      <div className="container">
        <div className="facility-grid">
          <Reveal as="div" className="facility-image-col">
            <div className="facility-img-wrap">
              <img src={FACILITY_IMG} alt="MSC Facility" loading="lazy" />
              <div className="facility-img-badge">
                <span className="fib-value">10,000+</span>
                <span className="fib-label">{t('facility.sqft')}</span>
              </div>
            </div>
          </Reveal>
          <Reveal as="div" delay={120} className="facility-info-col">
            <div className="section-label">{t('facility.label')}</div>
            <h2>{t('facility.headline1')}<br /><span className="text-orange">{t('facility.headline2')}</span></h2>
            <p className="facility-desc">{t('facility.description')}</p>
            <div className="facility-features">
              {FEATURES.map((f, i) => (
                <div key={i} className="facility-feature">
                  <div className="ff-icon">{f.icon}</div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn btn-dark mt-4">{t('facility.askButton')}</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
