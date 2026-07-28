import { useEffect, useState } from 'react';
import { API } from '../context/AuthContext';
import ImageUploader from '../components/ImageUploader';
import toast from 'react-hot-toast';
import './CrudPage.css';

const ICONS = ['court', 'basketball', 'academy', 'trophy', 'camp', 'event', 'partnership'];
const CATEGORIES = ['rental', 'academy', 'league', 'camp', 'event', 'partnership'];
const EMPTY = { title: '', description: '', category: 'rental', icon: 'court', features: '', order: 0, isActive: true };

export default function ProgramsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    API.get('/programs/admin').then(r => setItems(r.data.data)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openNew = () => { setForm(EMPTY); setEditId(null); setImageFile(null); setShowForm(true); };
  const openEdit = (item) => {
    setForm({ ...item, features: item.features?.join('\n') || '' });
    setEditId(item._id); setImageFile(null); setShowForm(true);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (k !== 'features') fd.append(k, v); });
      fd.append('features', JSON.stringify(form.features.split('\n').map(f => f.trim()).filter(Boolean)));
      if (imageFile) fd.append('image', imageFile);
      if (editId) { await API.put(`/programs/${editId}`, fd); toast.success('Program updated'); }
      else { await API.post('/programs', fd); toast.success('Program created'); }
      setShowForm(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error saving'); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this program?')) return;
    await API.delete(`/programs/${id}`);
    toast.success('Deleted'); load();
  };

  const toggle = async (item) => {
    await API.put(`/programs/${item._id}`, { isActive: !item.isActive });
    toast.success(item.isActive ? 'Hidden' : 'Published'); load();
  };

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <h2>Programs</h2>
          <p>{items.length} program{items.length !== 1 ? 's' : ''} total</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Program
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editId ? 'Edit Program' : 'Add Program'}</h3>
              <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={save} className="modal-form">
              <ImageUploader current={form.image} onSelect={setImageFile} label="Program Image" />
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Program title" />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required rows={3} />
              </div>
              <div className="form-group">
                <label>Features (one per line)</label>
                <textarea value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} rows={4} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Icon</label>
                  <select value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}>
                    {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} />
                </div>
              </div>
              <div className="form-row modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Program'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        {loading ? <p className="loading-text">Loading...</p> :
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Title</th><th>Category</th><th>Order</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td><div className="table-thumb">{item.image ? <img src={item.image} alt={item.title} /> : <div className="table-thumb-empty">—</div>}</div></td>
                  <td><strong>{item.title}</strong></td>
                  <td><span className="tag-pill">{item.category}</span></td>
                  <td>{item.order}</td>
                  <td>
                    <label className="toggle"><input type="checkbox" checked={item.isActive} onChange={() => toggle(item)} /><span className="toggle-slider" /></label>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn btn-ghost btn-sm" onClick={() => openEdit(item)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => del(item._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
}
