import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import AnnouncementBar from './components/common/AnnouncementBar';
import ScrollToTop from './components/common/ScrollToTop';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ProgramsPage from './pages/ProgramsPage';
import FacilityPage from './pages/FacilityPage';
import MembershipsPage from './pages/MembershipsPage';
import OffersPage from './pages/OffersPage';
import TestimonialsPage from './pages/TestimonialsPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';
import AdminApp from './admin/AdminApp';
import { fetchSettings } from './utils/api';

function Layout({ children, settings }) {
  const hasAnnouncement = settings?.announcement?.isActive;
  const { pathname } = useLocation();
  const FULL_BLEED_PATHS = ['/', '/partners', '/contact', '/testimonials'];
  const needsTopPadding = !FULL_BLEED_PATHS.includes(pathname) && !pathname.startsWith('/blog');
  return (
    <>
      <AnnouncementBar settings={settings} />
      <div style={{ paddingTop: hasAnnouncement ? '30px' : '0' }}>
        <Navbar settings={settings} hasAnnouncement={hasAnnouncement} />
        <main key={pathname} className="animate-fade" style={{ paddingTop: needsTopPadding ? '6rem' : 0 }}>{children}</main>
        <Footer settings={settings} />
      </div>
    </>
  );
}

export default function App() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings().then(setSettings).catch(console.error);
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-right" toastOptions={{ duration: 4000, style: { fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' } }} />
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route
            path="/*"
            element={
              <Layout settings={settings}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/programs" element={<ProgramsPage />} />
                  <Route path="/facility" element={<FacilityPage settings={settings} />} />
                  <Route path="/memberships" element={<MembershipsPage />} />
                  <Route path="/offers" element={<OffersPage />} />
                  <Route path="/testimonials" element={<TestimonialsPage />} />
                  <Route path="/partners" element={<PartnersPage />} />
                  <Route path="/contact" element={<ContactPage settings={settings} />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<div style={{padding:'8rem 2rem',textAlign:'center'}}>Blog post coming soon.</div>} />
                  <Route path="*" element={<div style={{padding:'8rem 2rem',textAlign:'center'}}><h2>Page not found</h2><a href="/" style={{color:'var(--orange)'}}>Go home</a></div>} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
