import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CreatorLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <div className="creator-dashboard">
      {/* Background decoration */}
      <div className="db-bg" aria-hidden="true">
        <div className="db-bg-blob db-bg-blob--1" />
        <div className="db-bg-blob db-bg-blob--2" />
        <div className="db-bg-blob db-bg-blob--3" />
      </div>

      {/* Mobile overlay */}
      <div
        className={`db-overlay ${mobileMenuOpen ? 'open active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div className="db-shell">
        {/* SIDEBAR */}
        <aside
          className={`db-sidebar ${mobileMenuOpen ? 'open' : ''}`}
          aria-label="Creator navigation"
        >
          <Link to="/" className="db-logo" aria-label="Arika Collabs home">
            <span className="db-logo-main">ARIKA</span>
            <span className="db-logo-sub">COLLABS</span>
          </Link>

          <nav className="db-nav" aria-label="Main navigation">
            <NavLink
              to="/creator/dashboard"
              className={({ isActive }) =>
                `db-nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="db-nav-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" />
                </svg>
              </span>
              Dashboard
            </NavLink>

            <NavLink
              to="/creator/collaborations"
              className={({ isActive }) =>
                `db-nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="db-nav-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Collaborations
            </NavLink>

            <NavLink
              to="/creator/profile"
              className={({ isActive }) =>
                `db-nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="db-nav-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Profile
            </NavLink>

            <NavLink
              to="/creator/contact"
              className={({ isActive }) =>
                `db-nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="db-nav-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Contact Arika
            </NavLink>
          </nav>

          <div className="db-nav-divider" aria-hidden="true" />

          <div className="db-logout">
            <button
              type="button"
              className="db-nav-item cursor-pointer"
              onClick={handleLogout}
              aria-label="Log out"
            >
              <span className="db-nav-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTAINER */}
        <div className="db-main">
          {/* Top Header */}
          <header className="db-header">
            <div className="db-header-left">
              <button
                type="button"
                className="db-mobile-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open navigation menu"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </button>
              <div className="db-greeting">
                <span className="db-greeting-eyebrow">CREATOR PORTAL</span>
                <span className="db-greeting-name">
                  Welcome back, {user?.name?.split(' ')[0] || 'Priya'}
                </span>
              </div>
            </div>

            <div className="db-header-right">
              <Link to="/creator/profile" className="db-user-pill">
                <img
                  src={user?.avatar || '/assets/images/creator-priya.jpg'}
                  alt={user?.name || 'Creator'}
                  className="db-avatar"
                />
                <span className="db-user-name">{user?.name || 'Priya Sharma'}</span>
              </Link>
            </div>
          </header>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
