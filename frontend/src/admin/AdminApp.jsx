import { Routes, Route, Navigate } from 'react-router-dom';
import './admin-vars.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HeroPage from './pages/HeroPage';
import ProgramsPage from './pages/ProgramsPage';
import InquiriesPage from './pages/InquiriesPage';
import GalleryPage from './pages/GalleryPage';
import BlogAdminPage from './pages/BlogAdminPage';
import SettingsPage from './pages/SettingsPage';
import GenericCrudPage from './pages/GenericCrudPage';

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--gray-400)', fontFamily: 'Inter' }}>Loading...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
}

function AdminRoutes() {
  const { admin } = useAuth();
  return (
    <Routes>
      <Route path="login" element={admin ? <Navigate to="/admin" replace /> : <LoginPage />} />
      <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="hero" element={<HeroPage />} />
        <Route path="programs" element={<ProgramsPage />} />
        <Route path="memberships" element={<GenericCrudPage entity="memberships" label="Memberships" fields={MEMBERSHIP_FIELDS} />} />
        <Route path="pricing" element={<GenericCrudPage entity="pricing" label="Court Pricing" fields={PRICING_FIELDS} />} />
        <Route path="offers" element={<GenericCrudPage entity="offers" label="Special Offers" fields={OFFERS_FIELDS} hasImage />} />
        <Route path="inquiries" element={<InquiriesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="team" element={<GenericCrudPage entity="team" label="Team Members" fields={TEAM_FIELDS} hasImage imageField="image" />} />
        <Route path="testimonials" element={<GenericCrudPage entity="testimonials" label="Testimonials" fields={TESTIMONIAL_FIELDS} hasImage imageField="avatar" />} />
        <Route path="blog" element={<BlogAdminPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminRoutes />
    </AuthProvider>
  );
}

// Field definitions for generic pages
const MEMBERSHIP_FIELDS = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'tier', label: 'Tier', type: 'select', options: ['bronze', 'silver', 'gold'] },
  { name: 'badge', label: 'Badge Label', type: 'text' },
  { name: 'price', label: 'Price ($/month)', type: 'number', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'features', label: 'Features (one per line)', type: 'textarea', isArray: true },
  { name: 'ctaText', label: 'Button Text', type: 'text' },
  { name: 'isPopular', label: 'Mark as Popular', type: 'toggle' },
  { name: 'isActive', label: 'Active', type: 'toggle' },
  { name: 'order', label: 'Display Order', type: 'number' },
];

const PRICING_FIELDS = [
  { name: 'courtName', label: 'Court Name', type: 'text', required: true },
  { name: 'offPeakPrice', label: 'Off-Peak Price ($/hr)', type: 'number', required: true },
  { name: 'peakPrice', label: 'Peak Price ($/hr)', type: 'number', required: true },
  { name: 'icon', label: 'Icon', type: 'select', options: ['basketball', 'volleyball', 'pickleball', 'badminton', 'soccer', 'ball', 'hockey', 'court'] },
  { name: 'isActive', label: 'Active', type: 'toggle' },
  { name: 'order', label: 'Display Order', type: 'number' },
];

const OFFERS_FIELDS = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'discount', label: 'Discount Label (e.g. 20% OFF)', type: 'text' },
  { name: 'badgeText', label: 'Badge Text', type: 'text' },
  { name: 'badgeColor', label: 'Badge Color', type: 'select', options: ['orange', 'green', 'blue', 'purple'] },
  { name: 'ctaText', label: 'Button Text', type: 'text' },
  { name: 'ctaLink', label: 'Button Link', type: 'text' },
  { name: 'validUntil', label: 'Valid Until', type: 'date' },
  { name: 'terms', label: 'Terms & Conditions', type: 'textarea' },
  { name: 'isFeatured', label: 'Featured', type: 'toggle' },
  { name: 'isActive', label: 'Active', type: 'toggle' },
  { name: 'order', label: 'Order', type: 'number' },
];

const TEAM_FIELDS = [
  { name: 'name', label: 'Full Name', type: 'text', required: true },
  { name: 'role', label: 'Role / Title', type: 'text', required: true },
  { name: 'bio', label: 'Bio', type: 'textarea' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'text' },
  { name: 'isActive', label: 'Active', type: 'toggle' },
  { name: 'order', label: 'Display Order', type: 'number' },
];

const TESTIMONIAL_FIELDS = [
  { name: 'name', label: 'Full Name', type: 'text', required: true },
  { name: 'role', label: 'Role / Program', type: 'text' },
  { name: 'text', label: 'Testimonial Text', type: 'textarea', required: true },
  { name: 'rating', label: 'Rating (1-5)', type: 'number' },
  { name: 'program', label: 'Program Label', type: 'text' },
  { name: 'isFeatured', label: 'Featured', type: 'toggle' },
  { name: 'isActive', label: 'Active', type: 'toggle' },
  { name: 'order', label: 'Order', type: 'number' },
];
