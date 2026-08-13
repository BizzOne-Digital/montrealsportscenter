import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchGallery } from '../../utils/api';
import Reveal from '../common/Reveal';
import { pick } from '../../utils/localize';
import './GallerySection.css';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=700&q=75&auto=format';

export default function GallerySection({ category, title, subtitle }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchGallery(category).then(setImages).catch(console.error);
  }, [category]);

  if (!images?.length) return null;

  return (
    <section className="section gallery-section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">{t('gallery.label')}</div>
          <h2>{title || t('gallery.defaultTitle')}<br /><span className="text-orange">{subtitle || t('gallery.defaultSubtitle')}</span></h2>
        </Reveal>
        <div className="gallery-grid">
          {images.map((img, i) => {
            const localizedTitle = pick(img, 'title', lang);
            return (
              <Reveal as="div" key={img._id} delay={i * 50} className="gallery-card">
                <img src={img.image || FALLBACK_IMG} alt={localizedTitle || 'MSC Gallery'} loading="lazy" />
                {localizedTitle && (
                  <div className="gallery-card-overlay">
                    <span>{localizedTitle}</span>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
