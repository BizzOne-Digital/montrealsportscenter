import { useTranslation } from 'react-i18next';
import { IconUsers, IconTarget, IconGift, IconShield } from '../common/Icons';
import Reveal from '../common/Reveal';
import './PartnerBenefitsSection.css';

export default function PartnerBenefitsSection() {
  const { t } = useTranslation();
  const BENEFITS = [
    { icon: <IconTarget size={22} color="#f97316" />, title: t('partnerBenefits.benefits.accessTitle'), desc: t('partnerBenefits.benefits.accessDesc') },
    { icon: <IconUsers size={22} color="#f97316" />, title: t('partnerBenefits.benefits.visibilityTitle'), desc: t('partnerBenefits.benefits.visibilityDesc') },
    { icon: <IconGift size={22} color="#f97316" />, title: t('partnerBenefits.benefits.sponsorshipTitle'), desc: t('partnerBenefits.benefits.sponsorshipDesc') },
    { icon: <IconShield size={22} color="#f97316" />, title: t('partnerBenefits.benefits.supportTitle'), desc: t('partnerBenefits.benefits.supportDesc') },
  ];
  const STEPS = [
    t('partnerBenefits.steps.step1'),
    t('partnerBenefits.steps.step2'),
    t('partnerBenefits.steps.step3'),
    t('partnerBenefits.steps.step4'),
  ];
  return (
    <section className="section partner-benefits-section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">{t('partnerBenefits.label')}</div>
          <h2>{t('partnerBenefits.headline1')}<br /><span className="text-orange">{t('partnerBenefits.headline2')}</span></h2>
        </Reveal>
        <div className="pb-grid">
          {BENEFITS.map((b, i) => (
            <Reveal as="div" key={i} delay={i * 70} className="pb-card card">
              <div className="pb-icon">{b.icon}</div>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </Reveal>
          ))}
        </div>
        <Reveal as="div" className="pb-steps">
          <h3>{t('partnerBenefits.howItStarts')}</h3>
          <ul>
            {STEPS.map((s, i) => (
              <li key={i}>
                <span className="pb-step-num">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
