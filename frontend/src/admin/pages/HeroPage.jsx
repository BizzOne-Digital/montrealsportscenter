import { useEffect, useState } from 'react';
import { API } from '../context/AuthContext';
import ImageUploader from '../components/ImageUploader';
import toast from 'react-hot-toast';
import './CrudPage.css';

export default function HeroPage() {
  const [form, setForm] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    API.get('/hero').then(r => setForm(r.data.data));
  }, []);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setMission = (key, val) => setForm(f => ({ ...f, mission: { ...f.mission, [key]: val } }));
  const setStat = (i, key, val) => setForm(f => {
    const stats = [...(f.stats || [])];
    stats[i] = { ...stats[i], [key]: val };
    return { ...f, stats };
  });
  const addStat = () => setForm(f => ({ ...f, stats: [...(f.stats || []), { value: '', label: '' }] }));
  const removeStat = (i) => setForm(f => ({ ...f, stats: f.stats.filter((_, idx) => idx !== i) }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      const { backgroundImage, stats, mission, _id, __v, createdAt, updatedAt, ...rest } = form;
      Object.entries(rest).forEach(([k, v]) => fd.append(k, v));
      fd.append('stats', JSON.stringify(stats || []));
      fd.append('mission', JSON.stringify(mission || {}));
      if (bgFile) fd.append('backgroundImage', bgFile);
      await API.put('/hero', fd);
      toast.success('Hero section updated');
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
    finally { setSaving(false); }
  };

  if (!form) return <p className="loading-text">Loading hero data...</p>;

  return (
    <form onSubmit={save} className="crud-page">
      <div className="crud-header">
        <div><h2>Hero Section</h2><p>Edit the homepage hero banner</p></div>
      </div>

      <div className="card settings-form">
        <div className="settings-section">
          <h4>Background Image</h4>
          <ImageUploader current={form.backgroundImage} onSelect={setBgFile} label="Hero Background" />
        </div>

        <div className="settings-section">
          <h4>Content</h4>
          <div className="form-row">
            <div className="form-group"><label>Badge Text</label><input value={form.badge || ''} onChange={e => set('badge', e.target.value)} placeholder="Year-round indoor basketball center" /></div>
            <div className="form-group"><label>FR: Badge Text</label><input value={form.badgeFr || ''} onChange={e => set('badgeFr', e.target.value)} placeholder="French translation (optional)" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Headline (use \n for line breaks)</label><textarea value={form.headline || ''} onChange={e => set('headline', e.target.value)} rows={3} /></div>
            <div className="form-group"><label>FR: Headline</label><textarea value={form.headlineFr || ''} onChange={e => set('headlineFr', e.target.value)} rows={3} placeholder="French translation (optional)" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Subheadline</label><textarea value={form.subheadline || ''} onChange={e => set('subheadline', e.target.value)} rows={3} /></div>
            <div className="form-group"><label>FR: Subheadline</label><textarea value={form.subheadlineFr || ''} onChange={e => set('subheadlineFr', e.target.value)} rows={3} placeholder="French translation (optional)" /></div>
          </div>
        </div>

        <div className="settings-section">
          <h4>CTA Buttons</h4>
          <div className="form-row">
            <div className="form-group"><label>Primary Button Text</label><input value={form.primaryBtnText || ''} onChange={e => set('primaryBtnText', e.target.value)} /></div>
            <div className="form-group"><label>FR: Primary Button Text</label><input value={form.primaryBtnTextFr || ''} onChange={e => set('primaryBtnTextFr', e.target.value)} placeholder="French translation (optional)" /></div>
            <div className="form-group"><label>Primary Button Link</label><input value={form.primaryBtnLink || ''} onChange={e => set('primaryBtnLink', e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Secondary Button Text</label><input value={form.secondaryBtnText || ''} onChange={e => set('secondaryBtnText', e.target.value)} /></div>
            <div className="form-group"><label>FR: Secondary Button Text</label><input value={form.secondaryBtnTextFr || ''} onChange={e => set('secondaryBtnTextFr', e.target.value)} placeholder="French translation (optional)" /></div>
            <div className="form-group"><label>Secondary Button Link</label><input value={form.secondaryBtnLink || ''} onChange={e => set('secondaryBtnLink', e.target.value)} /></div>
          </div>
        </div>

        <div className="settings-section">
          <h4>Mission Card</h4>
          <div className="form-row">
            <div className="form-group"><label>Mission Label</label><input value={form.mission?.title || ''} onChange={e => setMission('title', e.target.value)} /></div>
            <div className="form-group"><label>FR: Mission Label</label><input value={form.mission?.titleFr || ''} onChange={e => setMission('titleFr', e.target.value)} placeholder="French translation (optional)" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Mission Text</label><textarea value={form.mission?.text || ''} onChange={e => setMission('text', e.target.value)} rows={2} /></div>
            <div className="form-group"><label>FR: Mission Text</label><textarea value={form.mission?.textFr || ''} onChange={e => setMission('textFr', e.target.value)} rows={2} placeholder="French translation (optional)" /></div>
          </div>
        </div>

        <div className="settings-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0 }}>Stats</h4>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addStat}>+ Add Stat</button>
          </div>
          {(form.stats || []).map((stat, i) => (
            <div key={i} className="form-row" style={{ alignItems: 'flex-end' }}>
              <div className="form-group"><label>Value</label><input value={stat.value} onChange={e => setStat(i, 'value', e.target.value)} placeholder="10,000+" /></div>
              <div className="form-group"><label>Label</label><input value={stat.label} onChange={e => setStat(i, 'label', e.target.value)} placeholder="sq. ft. of court space" /></div>
              <div className="form-group"><label>FR: Label</label><input value={stat.labelFr || ''} onChange={e => setStat(i, 'labelFr', e.target.value)} placeholder="French translation (optional)" /></div>
              <button type="button" className="btn btn-danger btn-sm" style={{ marginBottom: '1rem' }} onClick={() => removeStat(i)}>✕</button>
            </div>
          ))}
        </div>
      </div>

      <div className="save-bar">
        <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Hero Section'}</button>
      </div>
    </form>
  );
}
