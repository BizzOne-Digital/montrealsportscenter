import { useEffect, useState } from 'react';
import { API } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './CrudPage.css';

const STATUSES = ['new', 'contacted', 'in-progress', 'closed'];
const STATUS_CLASS = { new: 'status-new', contacted: 'status-contacted', 'in-progress': 'status-in-progress', closed: 'status-closed' };

export default function InquiriesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    API.get('/inquiries', { params: { status: filter || undefined, limit: 50 } }).then(r => setItems(r.data.data)).finally(() => setLoading(false));
  };
  useEffect(load, [filter]);

  const updateStatus = async (id, status) => {
    await API.put(`/inquiries/${id}`, { status });
    toast.success('Status updated');
    load();
    if (selected?._id === id) setSelected(s => ({ ...s, status }));
  };

  const saveNotes = async (id, adminNotes) => {
    await API.put(`/inquiries/${id}`, { adminNotes });
    toast.success('Notes saved');
  };

  const del = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    await API.delete(`/inquiries/${id}`); toast.success('Deleted'); setSelected(null); load();
  };

  return (
    <div className="crud-page">
      <div className="crud-header">
        <div>
          <h2>Inquiries</h2>
          <p>{items.length} inquiry records</p>
        </div>
      </div>

      <div className="filter-bar">
        {['', ...STATUSES].map(s => (
          <button key={s} className={`filter-btn ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
            {s ? s.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'All'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
        <div className="card">
          {loading ? <p className="loading-text">Loading...</p> :
            items.length === 0 ? <div className="empty-state"><p>No inquiries found.</p></div> :
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Email</th><th>Interest</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id} style={{ cursor: 'pointer' }} onClick={() => setSelected(item)}>
                    <td><strong>{item.fullName}</strong></td>
                    <td style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>{item.email}</td>
                    <td style={{ textTransform: 'capitalize' }}>{item.interest?.replace(/-/g, ' ')}</td>
                    <td>
                      <select
                        className={`status-badge ${STATUS_CLASS[item.status] || ''}`}
                        value={item.status}
                        onChange={e => { e.stopPropagation(); updateStatus(item._id, e.target.value); }}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s.replace(/-/g, ' ')}</option>)}
                      </select>
                    </td>
                    <td style={{ color: 'var(--gray-400)', fontSize: '0.82rem' }}>{new Date(item.createdAt).toLocaleDateString('en-CA')}</td>
                    <td onClick={e => e.stopPropagation()}>
                      <button className="btn btn-danger btn-sm" onClick={() => del(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>

        {selected && (
          <div className="card inq-detail">
            <div className="modal-header" style={{ padding: '0 0 1rem', position: 'static', borderBottom: '1px solid var(--gray-100)' }}>
              <h3>{selected.fullName}</h3>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div><strong style={{ fontSize: '0.78rem', color: 'var(--gray-400)', textTransform: 'uppercase' }}>Email</strong><p>{selected.email}</p></div>
              {selected.phone && <div><strong style={{ fontSize: '0.78rem', color: 'var(--gray-400)', textTransform: 'uppercase' }}>Phone</strong><p>{selected.phone}</p></div>}
              <div><strong style={{ fontSize: '0.78rem', color: 'var(--gray-400)', textTransform: 'uppercase' }}>Interest</strong><p style={{ textTransform: 'capitalize' }}>{selected.interest?.replace(/-/g, ' ')}</p></div>
              <div><strong style={{ fontSize: '0.78rem', color: 'var(--gray-400)', textTransform: 'uppercase' }}>Message</strong><p className="inq-message">{selected.message}</p></div>
              <div>
                <strong style={{ fontSize: '0.78rem', color: 'var(--gray-400)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Admin Notes</strong>
                <AdminNotes inquiry={selected} onSave={saveNotes} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminNotes({ inquiry, onSave }) {
  const [notes, setNotes] = useState(inquiry.adminNotes || '');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <textarea className="inq-notes" value={notes} onChange={e => setNotes(e.target.value)} rows={4} placeholder="Internal notes..." />
      <button className="btn btn-primary btn-sm" onClick={() => onSave(inquiry._id, notes)}>Save Notes</button>
    </div>
  );
}
