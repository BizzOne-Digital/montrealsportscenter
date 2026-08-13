import { useTranslation } from 'react-i18next';
import { IconMapPin, IconPhone, IconMail } from '../common/Icons';
import Reveal from '../common/Reveal';
import { pick } from '../../utils/localize';
import './HoursLocationSection.css';

export default function HoursLocationSection({ settings }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const hours = settings?.operatingHours?.length ? settings.operatingHours : [
    { day: 'Monday', open: '7:00 AM', close: '10:00 PM' },
    { day: 'Tuesday', open: '7:00 AM', close: '10:00 PM' },
    { day: 'Wednesday', open: '7:00 AM', close: '10:00 PM' },
    { day: 'Thursday', open: '7:00 AM', close: '10:00 PM' },
    { day: 'Friday', open: '7:00 AM', close: '10:00 PM' },
    { day: 'Saturday', open: '8:00 AM', close: '9:00 PM' },
    { day: 'Sunday', open: '9:00 AM', close: '8:00 PM' },
  ];

  return (
    <section className="section hours-location-section">
      <div className="container">
        <div className="hl-grid">
          <Reveal as="div" className="hl-hours card">
            <div className="section-label">{t('hoursLocation.hoursHeading')}</div>
            <ul className="hl-hours-list">
              {hours.map(h => (
                <li key={h.day}>
                  <span className="hl-day">{pick(h, 'day', lang) || t(`hoursLocation.days.${h.day?.toLowerCase()}`)}</span>
                  <span className="hl-time">{h.isClosed ? t('hoursLocation.closed') : `${h.open} – ${h.close}`}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal as="div" delay={120} className="hl-location card">
            <div className="section-label">{t('hoursLocation.locationHeading')}</div>
            <div className="hl-detail">
              <IconMapPin size={18} color="#f97316" />
              <div>
                <div className="hl-detail-label">{t('hoursLocation.servingWestIsland')}</div>
                <p>{pick(settings, 'area', lang) || 'Serving Pointe-Claire, DDO, Pierrefonds, Kirkland, Beaconsfield, Dorval and nearby areas'}</p>
              </div>
            </div>
            {settings?.phone && (
              <div className="hl-detail hl-detail-inline">
                <IconPhone size={18} color="#f97316" />
                <div>
                  <div className="hl-detail-label">{t('hoursLocation.phone')}</div>
                  <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                </div>
              </div>
            )}
            {settings?.email && (
              <div className="hl-detail hl-detail-inline">
                <IconMail size={18} color="#f97316" />
                <div>
                  <div className="hl-detail-label">{t('hoursLocation.email')}</div>
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </div>
              </div>
            )}
            <a
              className="btn btn-primary hl-directions-btn"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings?.address || 'Montreal Sports Center')}`}
              target="_blank"
              rel="noreferrer"
            >
              {t('hoursLocation.getDirections')}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
