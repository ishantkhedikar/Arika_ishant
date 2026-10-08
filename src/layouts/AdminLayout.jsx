import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-portal-wrapper">
      {/* Ambient luxury glows */}
      <div className="admin-ambient-bg" aria-hidden="true">
        <div className="ambient-wave ambient-wave--top-right" />
        <div className="ambient-wave ambient-wave--bottom-left" />
      </div>

      {/* Mobile backdrop overlay */}
      <div
        className={`admin-overlay ${sidebarOpen ? 'open active' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <div className="admin-shell">
        {/* SIDEBAR */}
        <aside
          className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
          id="admin-sidebar"
          aria-label="Admin Navigation"
        >
          {/* Logo */}
          <Link to="/" className="sidebar-brand" id="admin-logo-link" onClick={() => setSidebarOpen(false)}>
            <span className="brand-main">
              ARIKA<span className="brand-sparkle">&#10022;</span>
            </span>
            <span className="brand-sub">COLLABS</span>
          </Link>

          {/* Navigation Links */}
          <nav className="sidebar-nav" aria-label="Admin modules">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 01-1.5 1.5h-5a.5.5 0 01-.5-.5v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1v5a.5.5 0 01-.5.5h-5A1.5 1.5 0 013 20v-9.5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/influencers"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Influencers</span>
            </NavLink>

            <NavLink
              to="/admin/campaigns"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M11 5L6 9H2v6h4l5 4V5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.54 8.46a5 5 0 010 7.07"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.07 4.93a10 10 0 010 14.14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Campaigns</span>
            </NavLink>

            <NavLink
              to="/admin/collaborations"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="12 2 2 7 12 12 22 7 12 2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="2 17 12 22 22 17" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="2 12 12 17 22 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Collaborations</span>
            </NavLink>

            <NavLink
              to="/admin/inquiries"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Inquiries</span>
            </NavLink>

            <NavLink
              to="/admin/content"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Content</span>
            </NavLink>

            <NavLink
              to="/admin/analytics"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Analytics</span>
            </NavLink>

            <NavLink
              to="/admin/settings"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Settings</span>
            </NavLink>
          </nav>

          {/* Quick Support / Version */}
          <div className="sidebar-footer">
            <button
              type="button"
              className="admin-logout-btn cursor-pointer"
              onClick={handleLogout}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* MAIN BODY AREA */}
        <main className="admin-main">
          {/* TOP HEADER */}
          <header className="admin-header">
            <div className="admin-header-left">
              <button
                type="button"
                className="admin-mobile-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Open sidebar menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <div className="portal-badge">
                <div className="portal-shield-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="9 12 11 14 15 10"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="portal-title-group">
                  <span className="portal-title">Private Admin Portal</span>
                  <span className="portal-tagline">Manage. Grow. Create Impact.</span>
                </div>
              </div>
            </div>

            <div className="header-actions">
              <Link to="/" className="btn-visit-website" id="header-visit-website">
                <span>Visit Website</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline points="15 3 21 3 21 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="10" y1="14" x2="21" y2="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Notification Popover Toggle */}
              <div className="notification-wrapper relative">
                <button
                  type="button"
                  className="notification-btn cursor-pointer"
                  onClick={() => setNotifOpen(!notifOpen)}
                  aria-label="Notifications"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="notification-dot" />
                </button>

                {notifOpen && (
                  <div className="notification-popup open">
                    <div className="notif-popup-header">
                      <h6>Notifications</h6>
                      <span className="notif-count-badge">3 New</span>
                    </div>
                    <div className="notif-list">
                      <div className="notif-item unread">
                        <div className="notif-icon bg-gold-subtle">
                          <span>✦</span>
                        </div>
                        <div className="notif-text">
                          <p>
                            <strong>Priya Sharma</strong> submitted draft for{' '}
                            <em>Summer Glow 2024</em>.
                          </p>
                          <small>12 min ago</small>
                        </div>
                      </div>
                      <div className="notif-item unread">
                        <div className="notif-icon bg-blue-subtle">
                          <span>✉</span>
                        </div>
                        <div className="notif-text">
                          <p>
                            New brand inquiry from <strong>Nykaa Cosmetics</strong>.
                          </p>
                          <small>45 min ago</small>
                        </div>
                      </div>
                      <div className="notif-item">
                        <div className="notif-icon bg-green-subtle">
                          <span>✓</span>
                        </div>
                        <div className="notif-text">
                          <p>Backup snapshot completed successfully.</p>
                          <small>2 hours ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Profile Pill & Dropdown */}
              <div className="admin-profile-pill-wrapper relative">
                <div
                  className="admin-profile-pill cursor-pointer"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <img
                    src={user?.avatar || '/assets/images/avatar-admin.svg'}
                    alt="Admin"
                    className="admin-avatar"
                  />
                  <span className="admin-name">{user?.name || 'Arika Admin'}</span>
                  <svg
                    className="admin-dropdown-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <polyline points="6 9 12 15 18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {profileOpen && (
                  <div className="profile-menu open">
                    <div style={{ padding: '6px 12px', fontSize: '11px', color: '#8C867E', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
                      Administrator Role
                    </div>
                    <div style={{ padding: '0 12px 6px 12px', fontSize: '12px', color: '#261C14', fontWeight: '600' }}>
                      {user?.name || 'Admin'}
                    </div>
                    <div style={{ height: '1px', background: '#EFECE6', margin: '4px 0' }} />
                    <Link
                      to="/admin/settings"
                      className="profile-menu-item"
                      onClick={() => setProfileOpen(false)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                      </svg>
                      <span>Settings & Access</span>
                    </Link>
                    <div style={{ height: '1px', background: '#EFECE6', margin: '4px 0' }} />
                    <button
                      type="button"
                      className="profile-menu-item"
                      style={{ color: '#DC2626' }}
                      onClick={handleLogout}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14">
                        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
