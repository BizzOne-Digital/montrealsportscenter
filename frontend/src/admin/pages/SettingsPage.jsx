import { useEffect, useState } from 'react';
import { API } from '../context/AuthContext';
import ImageUploader from '../components/ImageUploader';
import toast from 'react-hot-toast';
import './CrudPage.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SettingsPage() {
  const [form, setForm] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    API.get('/settings').then(r => {
      const d = r.data.data;
      if (!d.operatingHours?.length) {
        d.operatingHours = DAYS.map(day => ({ day, open: '8:00 AM', close: '9:00 PM', isClosed: false }));
      }
      setForm(d);
    });
  }, []);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setNested = (parent, key, val) => setForm(f => ({ ...f, [parent]: { ...f[parent], [key]: val } }));
  const setHours = (i, key, val) => setForm(f => {
    const h = [...f.operatingHours];
    h[i] = { ...h[i], [key]: val };
    return { ...f, operatingHours: h };
  });

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      const { logo, favicon, logoPublicId, operatingHours, socialLinks, seo, announcement, ...rest } = form;
      Object.entries(rest).forEach(([k, v]) => { if (v !== null && v !== undefined) fd.append(k, v); });
      fd.append('socialLinks', JSON.stringify(socialLinks || {}));
      fd.append('seo', JSON.stringify(seo || {}));
      fd.append('announcement', JSON.stringify(announcement || {}));
      fd.append('operatingHours', JSON.stringify(operatingHours || []));
      if (logoFile) fd.append('logo', logoFile);
      await API.put('/settings', fd);
      toast.success('Settings saved');
    } catch (err) { toast.error(err.response?.data?.message || 'Error saving'); }
    finally { setSaving(false); }
  };

  if (!form) return <p className="loading-text">Loading settings...</p>;

  return (
    <form onSubmit={save} className="crud-page">
      <div className="crud-header">
        <div><h2>Site Settings</h2><p>Global site configuration</p></div>
      </div>

      <div className="card settings-form">
        <div className="settings-section">
          <h4>Branding</h4>
          <ImageUploader current={form.logo} onSelect={setLogoFile} label="Site Logo" />
          <div className="form-row">
            <div className="form-group"><label>Site Name</label><input value={form.siteName || ''} onChange={e => set('siteName', e.target.value)} /></div>
            <div className="form-group"><label>Tagline</label><input value={form.tagline || ''} onChange={e => set('tagline', e.target.value)} /></div>
          </div>
        </div>

        <div className="settings-section">
          <h4>Contact Information</h4>
          <div className="form-row">
            <div className="form-group"><label>Email</label><input type="email" value={form.email || ''} onChange={e => set('email', e.target.value)} /></div>
            <div className="form-group"><label>Phone</label><input value={form.phone || ''} onChange={e => set('phone', e.target.value)} /></div>
          </div>
          <div className="form-group"><label>Address / Area</label><input value={form.address || ''} onChange={e => set('address', e.target.value)} /></div>
          <div className="form-group"><label>Service Area Description</label><input value={form.area || ''} onChange={e => set('area', e.target.value)} /></div>
        </div>

        <div className="settings-section">
          <h4>Social Links</h4>
          <div className="form-row">
            <div className="form-group"><label>Facebook URL</label><input value={form.socialLinks?.facebook || ''} onChange={e => setNested('socialLinks', 'facebook', e.target.value)} placeholder="https://facebook.com/..." /></div>
            <div className="form-group"><label>Instagram URL</label><input value={form.socialLinks?.instagram || ''} onChange={e => setNested('socialLinks', 'instagram', e.target.value)} placeholder="https://instagram.com/..." /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Twitter / X URL</label><input value={form.socialLinks?.twitter || ''} onChange={e => setNested('socialLinks', 'twitter', e.target.value)} /></div>
            <div className="form-group"><label>YouTube URL</label><input value={form.socialLinks?.youtube || ''} onChange={e => setNested('socialLinks', 'youtube', e.target.value)} /></div>
          </div>
        </div>

        <div className="settings-section">
          <h4>Announcement Bar</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <label className="toggle"><input type="checkbox" checked={form.announcement?.isActive || false} onChange={e => setNested('announcement', 'isActive', e.target.checked)} /><span className="toggle-slider" /></label>
            <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Show announcement bar</span>
          </div>
          <div className="form-group"><label>Announcement Text</label><input value={form.announcement?.text || ''} onChange={e => setNested('announcement', 'text', e.target.value)} /></div>
        </div>

        <div className="settings-section">
          <h4>SEO Settings</h4>
          <div className="form-group"><label>Meta Title</label><input value={form.seo?.metaTitle || ''} onChange={e => setNested('seo', 'metaTitle', e.target.value)} /></div>
          <div className="form-group"><label>Meta Description</label><textarea value={form.seo?.metaDescription || ''} onChange={e => setNested('seo', 'metaDescription', e.target.value)} rows={2} /></div>
          <div className="form-group"><label>Keywords</label><input value={form.seo?.keywords || ''} onChange={e => setNested('seo', 'keywords', e.target.value)} /></div>
        </div>

        <div className="settings-section">
          <h4>Operating Hours</h4>
          <table className="admin-table">
            <thead><tr><th>Day</th><th>Open</th><th>Close</th><th>Closed</th></tr></thead>
            <tbody>
              {(form.operatingHours || []).map((h, i) => (
                <tr key={h.day}>
                  <td><strong>{h.day}</strong></td>
                  <td><input style={{ width: '120px', padding: '4px 8px', border: '1px solid var(--gray-200)', borderRadius: '6px', fontSize: '0.875rem' }} value={h.open} onChange={e => setHours(i, 'open', e.target.value)} disabled={h.isClosed} /></td>
                  <td><input style={{ width: '120px', padding: '4px 8px', border: '1px solid var(--gray-200)', borderRadius: '6px', fontSize: '0.875rem' }} value={h.close} onChange={e => setHours(i, 'close', e.target.value)} disabled={h.isClosed} /></td>
                  <td><label className="toggle"><input type="checkbox" checked={h.isClosed || false} onChange={e => setHours(i, 'isClosed', e.target.checked)} /><span className="toggle-slider" /></label></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="save-bar">
        <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save All Settings'}</button>
      </div>
    </form>
  );
}
