import { Link } from 'react-router-dom';
import { IconShield, IconUsers, IconTarget, IconMapPin, IconCheck } from '../common/Icons';
import Reveal from '../common/Reveal';
import './FacilitySection.css';

const FACILITY_IMG = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80&auto=format';

const FEATURES = [
  { icon: <IconTarget size={20} color="#f97316" />, title: 'Basketball-focused layout', desc: 'Efficient court programming for rentals, academy sessions, camps, and tournaments.' },
  { icon: <IconUsers size={20} color="#f97316" />, title: 'Family-friendly environment', desc: 'A welcoming space for children, parents, teams, coaches, and community groups.' },
  { icon: <IconShield size={20} color="#f97316" />, title: 'Professional management', desc: 'Clear scheduling, organized programs, safety standards, and reliable communication.' },
  { icon: <IconMapPin size={20} color="#f97316" />, title: 'West Island community hub', desc: 'Serving Pointe-Claire, DDO, Pierrefonds, Kirkland, Beaconsfield, Dorval, and nearby areas.' },
];

export default function FacilitySection() {
  return (
    <section className="section facility-section" id="facility">
      <div className="container">
        <div className="facility-grid">
          <Reveal as="div" className="facility-image-col">
            <div className="facility-img-wrap">
              <img src={FACILITY_IMG} alt="MSC Facility" loading="lazy" />
              <div className="facility-img-badge">
                <span className="fib-value">10,000+</span>
                <span className="fib-label">sq. ft. of court space</span>
              </div>
            </div>
          </Reveal>
          <Reveal as="div" delay={120} className="facility-info-col">
            <div className="section-label">Facility Vision</div>
            <h2>Built for access, safety,<br /><span className="text-orange">and community impact.</span></h2>
            <p className="facility-desc">MSC is designed to become a trusted indoor destination where players can train consistently, families feel welcome, and organizations have a professional place to run programs.</p>
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
            <Link to="/contact" className="btn btn-dark mt-4">Ask About Availability</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
