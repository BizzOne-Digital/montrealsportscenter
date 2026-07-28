import { useEffect, useState } from 'react';
import { fetchGallery } from '../../utils/api';
import Reveal from '../common/Reveal';
import './GallerySection.css';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=700&q=75&auto=format';

export default function GallerySection({ category, title, subtitle }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchGallery(category).then(setImages).catch(console.error);
  }, [category]);

  if (!images?.length) return null;

  return (
    <section className="section gallery-section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">Gallery</div>
          <h2>{title || 'A closer look '}<br /><span className="text-orange">{subtitle || 'at the space.'}</span></h2>
        </Reveal>
        <div className="gallery-grid">
          {images.map((img, i) => (
            <Reveal as="div" key={img._id} delay={i * 50} className="gallery-card">
              <img src={img.image || FALLBACK_IMG} alt={img.title || 'MSC Gallery'} loading="lazy" />
              {img.title && (
                <div className="gallery-card-overlay">
                  <span>{img.title}</span>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
