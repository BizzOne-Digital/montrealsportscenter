import { useState, useRef } from 'react';
import './ImageUploader.css';

export default function ImageUploader({ current, onSelect, label = 'Image', folder = 'general' }) {
  const [preview, setPreview] = useState(current || null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onSelect(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const clear = (e) => {
    e.stopPropagation();
    setPreview(null);
    onSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div
        className={`img-uploader ${dragging ? 'dragging' : ''} ${preview ? 'has-preview' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="img-preview" />
            <div className="img-overlay">
              <button type="button" className="img-change-btn" onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Change
              </button>
              <button type="button" className="img-remove-btn" onClick={clear}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                Remove
              </button>
            </div>
          </>
        ) : (
          <div className="img-placeholder">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>Drop image here or <span className="iu-link">browse</span></span>
            <span className="iu-hint">JPG, PNG, WebP — max 10MB</span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="img-input-hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
    </div>
  );
}
