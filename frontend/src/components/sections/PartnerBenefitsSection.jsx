import { IconUsers, IconTarget, IconGift, IconShield } from '../common/Icons';
import Reveal from '../common/Reveal';
import './PartnerBenefitsSection.css';

const BENEFITS = [
  { icon: <IconTarget size={22} color="#f97316" />, title: 'Reliable Court Access', desc: 'Dedicated time slots for schools, associations, and organizations that need consistent, professional indoor space.' },
  { icon: <IconUsers size={22} color="#f97316" />, title: 'Community Visibility', desc: 'Reach families, youth, and community members across the West Island through co-branded programs and events.' },
  { icon: <IconGift size={22} color="#f97316" />, title: 'Sponsorship Packages', desc: 'Court naming, event sponsorships, and season-long branding opportunities tailored to your goals and budget.' },
  { icon: <IconShield size={22} color="#f97316" />, title: 'Professional Support', desc: 'A dedicated point of contact, clear scheduling, and reliable communication throughout the partnership.' },
];

const STEPS = [
  'Reach out with your organization and goals',
  'We schedule a call to understand your needs',
  'Agree on a program, sponsorship, or rental plan',
  'Launch the partnership and track results together',
];

export default function PartnerBenefitsSection() {
  return (
    <section className="section partner-benefits-section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">Why Partner With MSC</div>
          <h2>Built for organizations<br /><span className="text-orange">that need a reliable home base.</span></h2>
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
          <h3>How a partnership starts</h3>
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
