import { useEffect, useState } from 'react';
import { API } from '../context/AuthContext';
import ImageUploader from '../components/ImageUploader';
import toast from 'react-hot-toast';
import './CrudPage.css';
import './GalleryPage.css';

const CATS = ['facility', 'programs', 'events', 'team', 'general'];
const EMPTY = { title: '', description: '', category: 'general', order: 0, isActive: true };

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = () => { setLoading(true); API.get('/gallery/admin').then(r => setItems(r.data.data)).finally(() => setLoading(false)); };
  useEffect(load, []);

  const openNew = () => { setForm(EMPTY); setEditId(null); setImageFile(null); setShowForm(true); };
  const openEdit = (item) => { setForm({ ...item }); setEditId(item._id); setImageFile(null); setShowForm(true); };

  const save = async (e) => {
    e.preventDefault();
    if (!editId && !imageFile) { toast.error('Please select an image'); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('image', imageFile);
      if (editId) { await API.put(`/gallery/${editId}`, fd); toast.success('Updated'); }
      else { await API.post('/gallery', fd); toast.success('Image added'); }
      setShowForm(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this image from gallery and Cloudinary?')) return;
    await API.delete(`/gallery/${id}`); toast.success('Deleted'); load();
  };

  const toggle = async (item) => {
    await API.put(`/gallery/${item._id}`, { isActive: !item.isActive });
    load();
  };

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div><h2>Gallery</h2><p>{items.length} images total</p></div>
        <button className="btn btn-primary" onClick={openNew}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Upload Image
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editId ? 'Edit Image' : 'Upload Image'}</h3>
              <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={save} className="modal-form">
              <ImageUploader current={form.image} onSelect={setImageFile} label="Image *" />
              <div className="form-group">
                <label>Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Image title" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Order</label>
                  <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} />
              </div>
              <div className="form-row modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Uploading...' : 'Save to Gallery'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="gallery-grid">
        {loading ? <p className="loading-text">Loading...</p> :
          items.length === 0 ? <div className="empty-state"><p>No images yet. Upload your first image.</p></div> :
          items.map(item => (
            <div key={item._id} className={`gallery-item ${!item.isActive ? 'hidden' : ''}`}>
              <img src={item.image} alt={item.title} />
              <div className="gallery-item-overlay">
                <div className="gi-title">{item.title}</div>
                <div className="gi-cat">{item.category}</div>
                <div className="gi-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => openEdit(item)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => del(item._id)}>Delete</button>
                </div>
                <label className="toggle" style={{ marginTop: '4px' }}>
                  <input type="checkbox" checked={item.isActive} onChange={() => toggle(item)} />
                  <span className="toggle-slider" />
                </label>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
