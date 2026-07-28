import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../context/AuthContext';
import './DashboardPage.css';

const STAT_CARDS = (d) => [
  { label: 'Total Inquiries', value: d?.totalInquiries ?? '—', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, color: '#3b82f6', link: '/inquiries' },
  { label: 'New Inquiries', value: d?.newInquiries ?? '—', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>, color: '#f97316', link: '/inquiries', highlight: true },
  { label: 'Active Programs', value: d?.totalPrograms ?? '—', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93c4.08 4.08 4.08 10.07 0 14.14M19.07 4.93c-4.08 4.08-4.08 10.07 0 14.14M2 12h20"/></svg>, color: '#10b981', link: '/programs' },
  { label: 'Blog Posts', value: d?.totalPosts ?? '—', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>, color: '#8b5cf6', link: '/blog' },
  { label: 'Gallery Items', value: d?.totalGallery ?? '—', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>, color: '#ec4899', link: '/gallery' },
  { label: 'Testimonials', value: d?.totalTestimonials ?? '—', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, color: '#f59e0b', link: '/testimonials' },
];

const STATUS_CLASS = { new: 'status-new', contacted: 'status-contacted', 'in-progress': 'status-in-progress', closed: 'status-closed' };

const QUICK_LINKS = [
  { to: '/hero', label: 'Edit Hero Section' },
  { to: '/programs', label: 'Manage Programs' },
  { to: '/pricing', label: 'Update Pricing' },
  { to: '/offers', label: 'Manage Offers' },
  { to: '/gallery', label: 'Upload to Gallery' },
  { to: '/blog', label: 'Write a Blog Post' },
  { to: '/settings', label: 'Site Settings' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/dashboard/stats').then(r => setStats(r.data.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard">
      <div className="dash-welcome">
        <div>
          <h2>Good {getGreeting()}, MSC Team</h2>
          <p>Here's what's happening with your sports center today.</p>
        </div>
        <Link to="/admin/inquiries" className="btn btn-primary">View Inquiries</Link>
      </div>

      <div className="dash-stats">
        {STAT_CARDS(stats).map((card) => (
          <Link key={card.label} to={card.link} className={`stat-card ${card.highlight ? 'highlight' : ''}`}>
            <div className="sc-icon" style={{ background: card.color + '18', color: card.color }}>{card.icon}</div>
            <div className="sc-value" style={{ color: card.highlight ? card.color : undefined }}>{loading ? '...' : card.value}</div>
            <div className="sc-label">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="dash-grid">
        <div className="card">
          <div className="card-header">
            <h3>Recent Inquiries</h3>
            <Link to="/admin/inquiries" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          {loading ? <p className="loading-text">Loading...</p> :
            !stats?.recentInquiries?.length ? <div className="empty-state"><p>No inquiries yet.</p></div> :
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Interest</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {stats.recentInquiries.map(inq => (
                  <tr key={inq._id}>
                    <td><strong>{inq.fullName}</strong><br /><small style={{color:'var(--gray-400)'}}>{inq.email}</small></td>
                    <td style={{textTransform:'capitalize'}}>{inq.interest?.replace(/-/g,' ')}</td>
                    <td><span className={`status-badge ${STATUS_CLASS[inq.status] || ''}`}>{inq.status}</span></td>
                    <td style={{color:'var(--gray-400)',fontSize:'0.82rem'}}>{new Date(inq.createdAt).toLocaleDateString('en-CA')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>

        <div className="card">
          <div className="card-header"><h3>Quick Actions</h3></div>
          <div className="quick-links">
            {QUICK_LINKS.map(ql => (
              <Link key={ql.to} to={ql.to} className="quick-link">
                {ql.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
