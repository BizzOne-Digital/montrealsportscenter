import { useEffect, useState } from 'react';
import { API } from '../context/AuthContext';
import ImageUploader from '../components/ImageUploader';
import toast from 'react-hot-toast';
import './CrudPage.css';

const CATS = ['news', 'programs', 'events', 'community', 'tips'];
const EMPTY = { title: '', excerpt: '', content: '', category: 'news', author: 'MSC Team', tags: '', isPublished: false };

export default function BlogAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState('list');

  const load = () => { setLoading(true); API.get('/blog/admin').then(r => setItems(r.data.data)).finally(() => setLoading(false)); };
  useEffect(load, []);

  const openNew = () => { setForm(EMPTY); setEditId(null); setImageFile(null); setView('edit'); };
  const openEdit = (item) => { setForm({ ...item, tags: item.tags?.join(', ') || '' }); setEditId(item._id); setImageFile(null); setView('edit'); };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      const { tags, image, imagePublicId, slug, _id, __v, createdAt, updatedAt, publishedAt, views, ...rest } = form;
      Object.entries(rest).forEach(([k, v]) => fd.append(k, String(v)));
      fd.append('tags', JSON.stringify(tags.split(',').map(t => t.trim()).filter(Boolean)));
      if (imageFile) fd.append('image', imageFile);
      if (editId) { await API.put(`/blog/${editId}`, fd); toast.success('Post updated'); }
      else { await API.post('/blog', fd); toast.success('Post created'); }
      setView('list'); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await API.delete(`/blog/${id}`); toast.success('Deleted'); load();
  };

  const togglePublish = async (item) => {
    await API.put(`/blog/${item._id}`, { isPublished: !item.isPublished });
    toast.success(item.isPublished ? 'Unpublished' : 'Published'); load();
  };

  if (view === 'edit') return (
    <form onSubmit={save} className="crud-page">
      <div className="crud-header">
        <div><h2>{editId ? 'Edit Post' : 'New Post'}</h2></div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" className="btn btn-ghost" onClick={() => setView('list')}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Post'}</button>
        </div>
      </div>
      <div className="blog-editor">
        <div className="blog-main card">
          <div className="form-group"><label>Title *</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Post title" /></div>
          <div className="form-group"><label>Excerpt *</label><textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} required rows={3} placeholder="Short summary shown in listings..." /></div>
          <div className="form-group"><label>Content *</label><textarea className="content-area" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required placeholder="Full post content... (Markdown supported)" /></div>
        </div>
        <div className="blog-sidebar">
          <div className="card">
            <div className="form-group">
              <label>Publish Status</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                <label className="toggle"><input type="checkbox" checked={form.isPublished} onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))} /><span className="toggle-slider" /></label>
                <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>{form.isPublished ? 'Published' : 'Draft'}</span>
              </div>
            </div>
            <div className="form-group"><label>Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Author</label><input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} /></div>
            <div className="form-group"><label>Tags (comma separated)</label><input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="basketball, youth, community" /></div>
          </div>
          <div className="card">
            <ImageUploader current={form.image} onSelect={setImageFile} label="Featured Image" />
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div><h2>Blog / News</h2><p>{items.length} posts total</p></div>
        <button className="btn btn-primary" onClick={openNew}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Post
        </button>
      </div>
      <div className="card">
        {loading ? <p className="loading-text">Loading...</p> :
          items.length === 0 ? <div className="empty-state"><p>No posts yet.</p></div> :
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Category,</th><th>Author</th><th>Published</th><th>Views</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td><strong>{item.title}</strong><br /><small style={{ color: 'var(--gray-400)' }}>{new Date(item.createdAt).toLocaleDateString('en-CA')}</small></td>
                  <td><span className="tag-pill">{item.category}</span></td>
                  <td>{item.author}</td>
                  <td><label className="toggle"><input type="checkbox" checked={item.isPublished} onChange={() => togglePublish(item)} /><span className="toggle-slider" /></label></td>
                  <td>{item.views || 0}</td>
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
