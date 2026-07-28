import { useState } from 'react';
import { submitInquiry } from '../../utils/api';
import { IconMail, IconPhone, IconMapPin, IconCheck } from '../common/Icons';
import Reveal from '../common/Reveal';
import './ContactSection.css';

const INTERESTS = [
  { value: 'court-rental', label: 'Court Rental' },
  { value: 'youth-academy', label: 'Youth Academy' },
  { value: 'camps-clinics', label: 'Camps & Clinics' },
  { value: 'leagues', label: 'Leagues & Tournaments' },
  { value: 'birthday-event', label: 'Birthday / Event' },
  { value: 'membership', label: 'Membership' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' },
];

export default function ContactSection({ settings }) {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', interest: 'court-rental', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.message) { setError('Please fill in all required fields.'); return; }
    setStatus('loading'); setError('');
    try {
      await submitInquiry(form);
      setStatus('success');
      setForm({ fullName: '', email: '', phone: '', interest: 'court-rental', message: '' });
    } catch {
      setStatus('idle');
      setError('Something went wrong. Please try again or email us directly.');
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <Reveal as="div" className="contact-info">
            <div className="section-label" style={{ color: 'var(--orange)' }}>Contact MSC</div>
            <h2 style={{ color: 'white' }}>Be first to know when<br /><span className="text-orange">bookings open.</span></h2>
            <p className="contact-desc">Interested in court rentals, youth academy, camps, tournaments, birthdays, corporate events, or partnerships? Send a message and we'll follow up with details.</p>
            <div className="contact-details">
              {settings?.email && (
                <div className="contact-detail">
                  <div className="cd-icon"><IconMail size={18} color="white" /></div>
                  <div>
                    <div className="cd-label">Email</div>
                    <a href={`mailto:${settings.email}`}>{settings.email}</a>
                  </div>
                </div>
              )}
              {settings?.phone && (
                <div className="contact-detail">
                  <div className="cd-icon"><IconPhone size={18} color="white" /></div>
                  <div>
                    <div className="cd-label">Phone</div>
                    <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                  </div>
                </div>
              )}
              {settings?.address && (
                <div className="contact-detail">
                  <div className="cd-icon"><IconMapPin size={18} color="white" /></div>
                  <div>
                    <div className="cd-label">Area</div>
                    <span>{settings.address}</span>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal as="div" delay={120} className="contact-form-wrap">
            {status === 'success' ? (
              <div className="contact-success">
                <div className="success-icon"><IconCheck size={32} color="white" /></div>
                <h3>Message Received!</h3>
                <p>Thank you for reaching out. Our team will get back to you shortly with more information.</p>
                <button className="btn btn-primary mt-3" onClick={() => setStatus('idle')}>Send Another Message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit} noValidate>
                <h3>Send an Inquiry</h3>
                {error && <div className="form-error">{error}</div>}
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name <span>*</span></label>
                    <input name="fullName" value={form.fullName} onChange={handle} placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label>Email <span>*</span></label>
                    <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" value={form.phone} onChange={handle} placeholder="514-000-0000" />
                  </div>
                  <div className="form-group">
                    <label>I am interested in</label>
                    <select name="interest" value={form.interest} onChange={handle}>
                      {INTERESTS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Message <span>*</span></label>
                  <textarea name="message" value={form.message} onChange={handle} rows={5} placeholder="Tell us what you are looking for..." required />
                </div>
                <button type="submit" className="btn btn-primary contact-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
