import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import CreatorLayout from './layouts/CreatorLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import OurWork from './pages/OurWork';
import Instagram from './pages/Instagram';
import Contact from './pages/Contact';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import CreatorGuide from './pages/CreatorGuide';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Support from './pages/Support';

// Creator Pages
import CreatorDashboard from './pages/creator/Dashboard';
import CreatorCollaborations from './pages/creator/Collaborations';
import CreatorProfile from './pages/creator/Profile';
import CreatorContact from './pages/creator/Contact';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminInfluencers from './pages/admin/Influencers';
import AdminCampaigns from './pages/admin/Campaigns';
import AdminCollaborations from './pages/admin/Collaborations';
import AdminInquiries from './pages/admin/Inquiries';
import AdminContent from './pages/admin/Content';
import AdminAnalytics from './pages/admin/Analytics';
import AdminSettings from './pages/admin/Settings';

function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login?error=unauthorized" replace />;
  }
  return children;
}

function CreatorRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<OurWork />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/campaign/:id" element={<OurWork />} />
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creator-guide" element={<CreatorGuide />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/support" element={<Support />} />
      </Route>

      {/* Auth Pages without public header/footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Navigate to="/login?tab=register" replace />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Legacy redirects */}
      <Route path="/dashboard" element={<Navigate to="/creator/dashboard" replace />} />
      <Route path="/dashboard.html" element={<Navigate to="/creator/dashboard" replace />} />
      <Route path="/about.html" element={<Navigate to="/about" replace />} />
      <Route path="/our-work.html" element={<Navigate to="/our-work" replace />} />
      <Route path="/instagram.html" element={<Navigate to="/instagram" replace />} />
      <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
      <Route path="/login.html" element={<Navigate to="/login" replace />} />

      {/* Creator Portal */}
      <Route
        path="/creator"
        element={
          <CreatorRoute>
            <CreatorLayout />
          </CreatorRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<CreatorDashboard />} />
        <Route path="collaborations" element={<CreatorCollaborations />} />
        <Route path="profile" element={<CreatorProfile />} />
        <Route path="contact" element={<CreatorContact />} />
      </Route>

      {/* Admin Portal */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="influencers" element={<AdminInfluencers />} />
        <Route path="campaigns" element={<AdminCampaigns />} />
        <Route path="collaborations" element={<AdminCollaborations />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="content" element={<AdminContent />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="settings/:tab" element={<AdminSettings />} />
      </Route>

      {/* Admin Case Sensitivity Support */}
      <Route path="/Admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/Admin/*" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
