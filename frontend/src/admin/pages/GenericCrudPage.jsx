import { useEffect, useState } from 'react';
import { API } from '../context/AuthContext';
import ImageUploader from '../components/ImageUploader';
import toast from 'react-hot-toast';
import './CrudPage.css';

export default function GenericCrudPage({ entity, label, fields, hasImage, imageField = 'image' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fields that have a paired French input (field.frKey) are treated as isArray-aware
  // via the same frKey name, so array splitting/joining applies to both EN and FR keys.
  const allKeys = (fd) => fd.frKey ? [fd.name, fd.frKey] : [fd.name];

  const buildEmpty = () => {
    const obj = {};
    fields.forEach(f => {
      allKeys(f).forEach(key => {
        if (f.type === 'toggle') obj[key] = key === 'isActive' ? true : false;
        else if (f.type === 'number') obj[key] = key === 'order' ? 0 : '';
        else obj[key] = '';
      });
    });
    return obj;
  };

  const load = () => {
    setLoading(true);
    API.get(`/${entity}/admin`).then(r => setItems(r.data.data || [])).catch(() => API.get(`/${entity}`).then(r => setItems(r.data.data || []))).finally(() => setLoading(false));
  };
  useEffect(load, [entity]);

  const openNew = () => { setForm(buildEmpty()); setEditId(null); setImageFile(null); setShowForm(true); };
  const openEdit = (item) => {
    const f = { ...item };
    fields.filter(fd => fd.isArray).forEach(fd => {
      allKeys(fd).forEach(key => { if (Array.isArray(f[key])) f[key] = f[key].join('\n'); });
    });
    setForm(f); setEditId(item._id); setImageFile(null); setShowForm(true);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let data;
      if (hasImage) {
        data = new FormData();
        Object.entries(form).forEach(([k, v]) => {
          const field = fields.find(f => f.name === k || f.frKey === k);
          if (field?.isArray) data.append(k, JSON.stringify(String(v).split('\n').map(s => s.trim()).filter(Boolean)));
          else if (v !== null && v !== undefined) data.append(k, String(v));
        });
        if (imageFile) data.append(imageField, imageFile);
      } else {
        data = { ...form };
        fields.filter(fd => fd.isArray).forEach(fd => {
          allKeys(fd).forEach(key => {
            if (typeof data[key] === 'string') data[key] = data[key].split('\n').map(s => s.trim()).filter(Boolean);
          });
        });
      }
      if (editId) { await API.put(`/${entity}/${editId}`, data); toast.success(`${label.slice(0, -1)} updated`); }
      else { await API.post(`/${entity}`, data); toast.success(`${label.slice(0, -1)} created`); }
      setShowForm(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error saving'); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!window.confirm(`Delete this ${label.toLowerCase().slice(0, -1)}?`)) return;
    await API.delete(`/${entity}/${id}`); toast.success('Deleted'); load();
  };

  const toggle = async (item, field) => {
    await API.put(`/${entity}/${item._id}`, { [field]: !item[field] });
    load();
  };

  const nameField = fields.find(f => f.required && f.type === 'text');

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div><h2>{label}</h2><p>{items.length} record{items.length !== 1 ? 's' : ''}</p></div>
        <button className="btn btn-primary" onClick={openNew}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add {label.slice(0, -1)}
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editId ? 'Edit' : 'Add'} {label.slice(0, -1)}</h3>
              <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={save} className="modal-form">
              {hasImage && <ImageUploader current={form[imageField]} onSelect={setImageFile} label="Image" />}
              {fields.map(field => (
                <div key={field.name} className={field.frKey ? 'form-row' : undefined}>
                  <div className="form-group">
                    <label>{field.label}{field.required ? ' *' : ''}</label>
                    {field.type === 'text' || field.type === 'email' || field.type === 'date' ? (
                      <input type={field.type} value={form[field.name] || ''} onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))} required={field.required} />
                    ) : field.type === 'number' ? (
                      <input type="number" value={form[field.name] ?? ''} onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))} required={field.required} min={field.name === 'rating' ? 1 : 0} max={field.name === 'rating' ? 5 : undefined} />
                    ) : field.type === 'textarea' ? (
                      <textarea value={form[field.name] || ''} onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))} required={field.required} rows={3} />
                    ) : field.type === 'select' ? (
                      <select value={form[field.name] || ''} onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}>
                        {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : field.type === 'toggle' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                        <label className="toggle"><input type="checkbox" checked={!!form[field.name]} onChange={e => setForm(f => ({ ...f, [field.name]: e.target.checked }))} /><span className="toggle-slider" /></label>
                        <span style={{ fontSize: '0.875rem' }}>{form[field.name] ? 'Yes' : 'No'}</span>
                      </div>
                    ) : null}
                  </div>
                  {field.frKey && (
                    <div className="form-group">
                      <label>FR: {field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea value={form[field.frKey] || ''} onChange={e => setForm(f => ({ ...f, [field.frKey]: e.target.value }))} rows={3} placeholder="French translation (optional)" />
                      ) : (
                        <input type={field.type === 'number' ? 'number' : 'text'} value={form[field.frKey] || ''} onChange={e => setForm(f => ({ ...f, [field.frKey]: e.target.value }))} placeholder="French translation (optional)" />
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="form-row modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        {loading ? <p className="loading-text">Loading...</p> :
          items.length === 0 ? <div className="empty-state"><p>No {label.toLowerCase()} yet.</p></div> :
          <table className="admin-table">
            <thead>
              <tr>
                {hasImage && <th>Image</th>}
                <th>{nameField?.label || 'Name'}</th>
                {fields.find(f => f.name === 'price') && <th>Price</th>}
                {fields.find(f => f.name === 'offPeakPrice') && <th>Off-Peak</th>}
                {fields.find(f => f.name === 'peakPrice') && <th>Peak</th>}
                {fields.find(f => f.name === 'isActive') && <th>Active</th>}
                {fields.find(f => f.name === 'isPublished') && <th>Published</th>}
                {fields.find(f => f.name === 'isFeatured') && <th>Featured</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  {hasImage && <td><div className="table-thumb">{item[imageField] ? <img src={item[imageField]} alt="" /> : <div className="table-thumb-empty">—</div>}</div></td>}
                  <td><strong>{item[nameField?.name] || item.title || item.name || item.courtName || '—'}</strong></td>
                  {fields.find(f => f.name === 'price') && <td>${item.price}/mo</td>}
                  {fields.find(f => f.name === 'offPeakPrice') && <td>${item.offPeakPrice}/hr</td>}
                  {fields.find(f => f.name === 'peakPrice') && <td>${item.peakPrice}/hr</td>}
                  {fields.find(f => f.name === 'isActive') && <td><label className="toggle"><input type="checkbox" checked={!!item.isActive} onChange={() => toggle(item, 'isActive')} /><span className="toggle-slider" /></label></td>}
                  {fields.find(f => f.name === 'isFeatured') && <td><label className="toggle"><input type="checkbox" checked={!!item.isFeatured} onChange={() => toggle(item, 'isFeatured')} /><span className="toggle-slider" /></label></td>}
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
