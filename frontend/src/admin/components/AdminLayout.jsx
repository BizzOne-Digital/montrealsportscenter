import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AdminLayout.css';

const PAGE_TITLES = {
  '/admin': 'Dashboard', '/admin/hero': 'Hero Section', '/admin/programs': 'Programs',
  '/admin/memberships': 'Memberships', '/admin/pricing': 'Pricing', '/admin/offers': 'Special Offers',
  '/admin/inquiries': 'Inquiries', '/admin/gallery': 'Gallery', '/admin/team': 'Our Team',
  '/admin/testimonials': 'Testimonials', '/admin/blog': 'Blog / News', '/admin/settings': 'Site Settings',
};

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] || 'Admin';

  return (
    <div className="admin-layout">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="admin-main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="topbar-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <h1 className="topbar-title">{title}</h1>
          </div>
          <div className="topbar-right">
            <a href="/" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm topbar-preview">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              View Site
            </a>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
