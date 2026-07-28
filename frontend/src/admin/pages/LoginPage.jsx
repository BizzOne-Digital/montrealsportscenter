import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './LoginPage.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally { setLoading(false); }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo-mark"><span>MSC</span></div>
          <div>
            <div className="login-brand-name">Montreal Sports Center</div>
            <div className="login-brand-sub">Admin Portal</div>
          </div>
        </div>
        <div className="login-tagline">
          <h1>Manage your center.<br />Grow your community.</h1>
          <p>Full control over programs, pricing, bookings, content, and team — all from one place.</p>
        </div>
        <div className="login-features">
          {['Dynamic content management', 'Cloudinary image uploads', 'Inquiry & lead tracking', 'Real-time site updates'].map(f => (
            <div key={f} className="lf-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {f}
            </div>
          ))}
        </div>
      </div>
      <div className="login-right">
        <div className="login-card">
          <h2>Sign in to admin</h2>
          <p className="login-sub">Enter your credentials to access the dashboard</p>
          <form onSubmit={submit}>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="admin@montrealsportscenter.ca" required autoComplete="email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" required autoComplete="current-password" />
            </div>
            <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="login-hint">Powered by BizzOne Digital</p>
        </div>
      </div>
    </div>
  );
}
