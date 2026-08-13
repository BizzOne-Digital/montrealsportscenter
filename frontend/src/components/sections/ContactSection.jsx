import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { submitInquiry } from '../../utils/api';
import { IconMail, IconPhone, IconMapPin, IconCheck } from '../common/Icons';
import Reveal from '../common/Reveal';
import { pick } from '../../utils/localize';
import './ContactSection.css';

export default function ContactSection({ settings }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const INTERESTS = [
    { value: 'court-rental', label: t('contact.interests.courtRental') },
    { value: 'youth-academy', label: t('contact.interests.youthAcademy') },
    { value: 'camps-clinics', label: t('contact.interests.campsClinics') },
    { value: 'leagues', label: t('contact.interests.leagues') },
    { value: 'birthday-event', label: t('contact.interests.birthdayEvent') },
    { value: 'membership', label: t('contact.interests.membership') },
    { value: 'partnership', label: t('contact.interests.partnership') },
    { value: 'other', label: t('contact.interests.other') },
  ];
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', interest: 'court-rental', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.message) { setError(t('contact.requiredError')); return; }
    setStatus('loading'); setError('');
    try {
      await submitInquiry(form);
      setStatus('success');
      setForm({ fullName: '', email: '', phone: '', interest: 'court-rental', message: '' });
    } catch {
      setStatus('idle');
      setError(t('contact.genericError'));
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <Reveal as="div" className="contact-info">
            <div className="section-label" style={{ color: 'var(--orange)' }}>{t('contact.label')}</div>
            <h2 style={{ color: 'white' }}>{t('contact.headline1')}<br /><span className="text-orange">{t('contact.headline2')}</span></h2>
            <p className="contact-desc">{t('contact.description')}</p>
            <div className="contact-details">
              {settings?.email && (
                <div className="contact-detail">
                  <div className="cd-icon"><IconMail size={18} color="white" /></div>
                  <div>
                    <div className="cd-label">{t('contact.email')}</div>
                    <a href={`mailto:${settings.email}`}>{settings.email}</a>
                  </div>
                </div>
              )}
              {settings?.phone && (
                <div className="contact-detail">
                  <div className="cd-icon"><IconPhone size={18} color="white" /></div>
                  <div>
                    <div className="cd-label">{t('contact.phone')}</div>
                    <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                  </div>
                </div>
              )}
              {settings?.address && (
                <div className="contact-detail">
                  <div className="cd-icon"><IconMapPin size={18} color="white" /></div>
                  <div>
                    <div className="cd-label">{t('contact.area')}</div>
                    <span>{pick(settings, 'address', lang)}</span>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal as="div" delay={120} className="contact-form-wrap">
            {status === 'success' ? (
              <div className="contact-success">
                <div className="success-icon"><IconCheck size={32} color="white" /></div>
                <h3>{t('contact.successTitle')}</h3>
                <p>{t('contact.successMessage')}</p>
                <button className="btn btn-primary mt-3" onClick={() => setStatus('idle')}>{t('contact.sendAnother')}</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit} noValidate>
                <h3>{t('contact.formTitle')}</h3>
                {error && <div className="form-error">{error}</div>}
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('contact.fullName')} <span>*</span></label>
                    <input name="fullName" value={form.fullName} onChange={handle} placeholder={t('contact.fullNamePlaceholder')} required />
                  </div>
                  <div className="form-group">
                    <label>{t('contact.email')} <span>*</span></label>
                    <input name="email" type="email" value={form.email} onChange={handle} placeholder={t('contact.emailPlaceholder')} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('contact.phoneLabel')}</label>
                    <input name="phone" value={form.phone} onChange={handle} placeholder={t('contact.phonePlaceholder')} />
                  </div>
                  <div className="form-group">
                    <label>{t('contact.interestLabel')}</label>
                    <select name="interest" value={form.interest} onChange={handle}>
                      {INTERESTS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>{t('contact.messageLabel')} <span>*</span></label>
                  <textarea name="message" value={form.message} onChange={handle} rows={5} placeholder={t('contact.messagePlaceholder')} required />
                </div>
                <button type="submit" className="btn btn-primary contact-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? t('contact.sending') : t('contact.submit')}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
