import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconBasketball, IconTarget } from '../common/Icons';
import Reveal from '../common/Reveal';
import './PricingSection.css';

const COURT_ICONS = {
  basketball: <IconBasketball size={20} color="#f97316" />,
  volleyball: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"/><path d="M2 12h20"/></svg>,
  pickleball: <IconTarget size={20} color="#f97316" />,
  badminton: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5"><path d="M12 22V12M12 12L7 2M12 12l5-10"/><circle cx="12" cy="12" r="3"/></svg>,
  soccer: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
};

export default function PricingSection({ pricing }) {
  const [mode, setMode] = useState('peak');
  if (!pricing?.length) return null;

  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <Reveal as="div" className="pricing-header">
          <div>
            <div className="section-label">Court Pricing</div>
            <h2>Transparent rates,<br /><span className="text-orange">no hidden fees.</span></h2>
          </div>
          <div className="pricing-toggle">
            <button className={mode === 'offpeak' ? 'active' : ''} onClick={() => setMode('offpeak')}>Off-Peak</button>
            <button className={mode === 'peak' ? 'active' : ''} onClick={() => setMode('peak')}>Peak Hours</button>
          </div>
        </Reveal>

        <div className="pricing-note-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Peak hours are typically evenings (6–10 PM) and weekends. Contact us for exact schedules and group discounts.
        </div>

        <div className="pricing-grid">
          {pricing.map((item, i) => (
            <Reveal as="div" key={item._id} delay={i * 50} className="pricing-card">
              <div className="pricing-card-icon">
                {COURT_ICONS[item.icon] || <IconBasketball size={20} color="#f97316" />}
              </div>
              <div className="pricing-card-info">
                <h4>{item.courtName}</h4>
                <div className="pricing-tag">per {item.unit || 'hour'}</div>
              </div>
              <div className="pricing-card-price">
                <span className="price-amount">
                  ${mode === 'peak' ? item.peakPrice : item.offPeakPrice}
                </span>
                <span className="price-label">/hr</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="pricing-cta-block">
          <div className="pcb-text">
            <h3>Need a custom quote?</h3>
            <p>Block bookings, team packages, and association rates are available. Get in touch.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">Request a Quote</Link>
        </div>
      </div>
    </section>
  );
}
