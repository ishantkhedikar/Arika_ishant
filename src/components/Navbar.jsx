import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="logo" aria-label="Arika Collabs Home">
            ARIKA <span>COLLABS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="main-nav" aria-label="Main Navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              About
            </NavLink>
            <NavLink
              to="/our-work"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Our Work
            </NavLink>
            <NavLink
              to="/instagram"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Instagram
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Contact
            </NavLink>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="auth-buttons">
            {isAuthenticated ? (
              <>
                <div className="user-chip">
                  <img
                    src={user?.avatar || '/assets/images/creator-priya.jpg'}
                    alt={user?.name || 'User'}
                  />
                  <div className="user-meta">
                    Hi, {user?.name?.split(' ')[0] || 'User'}
                    <small>{isAdmin ? 'Admin' : 'Creator'}</small>
                  </div>
                </div>
                {isAdmin ? (
                  <Link to="/admin/dashboard" className="btn btn-gold nav-cta-btn">
                    ✦ Admin Portal &rarr;
                  </Link>
                ) : (
                  <Link to="/creator/dashboard" className="btn btn-gold nav-cta-btn">
                    &#9638; Dashboard &rarr;
                  </Link>
                )}
                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-outline nav-logout-btn cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline nav-login-btn">
                  Login
                </Link>
                <Link to="/login?tab=register" className="btn btn-primary nav-reg-btn">
                  Register &rarr;
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Controls: Compact CTA + Hamburger */}
          <div className="site-header__mobile-controls">
            {isAuthenticated ? (
              <Link
                to={isAdmin ? '/admin/dashboard' : '/creator/dashboard'}
                className="btn btn-gold btn-compact-mobile"
                aria-label="Dashboard"
              >
                {isAdmin ? 'Admin' : 'Portal'}
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn btn-outline btn-compact-mobile"
              >
                Login
              </Link>
            )}

            <button
              type="button"
              className={`site-mobile-toggle ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileOpen}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`site-mobile-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Menu */}
      <div className={`site-mobile-drawer ${mobileOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="mobile-drawer-header">
          <Link to="/" className="logo" onClick={() => setMobileOpen(false)}>
            ARIKA <span>COLLABS</span>
          </Link>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        <nav className="mobile-drawer-nav" aria-label="Mobile Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setMobileOpen(false)}
          >
            <span>Home</span>
            <span className="nav-arrow">&rarr;</span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setMobileOpen(false)}
          >
            <span>About Us</span>
            <span className="nav-arrow">&rarr;</span>
          </NavLink>
          <NavLink
            to="/our-work"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setMobileOpen(false)}
          >
            <span>Our Work</span>
            <span className="nav-arrow">&rarr;</span>
          </NavLink>
          <NavLink
            to="/instagram"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setMobileOpen(false)}
          >
            <span>Instagram Collabs</span>
            <span className="nav-arrow">&rarr;</span>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setMobileOpen(false)}
          >
            <span>Contact & Inquiries</span>
            <span className="nav-arrow">&rarr;</span>
          </NavLink>
        </nav>

        <div className="mobile-drawer-divider" />

        <div className="mobile-drawer-auth">
          {isAuthenticated ? (
            <div className="mobile-auth-user">
              <div className="mobile-user-card">
                <img
                  src={user?.avatar || '/assets/images/creator-priya.jpg'}
                  alt={user?.name || 'User'}
                  className="mobile-avatar"
                />
                <div className="mobile-user-details">
                  <strong>{user?.name || 'User'}</strong>
                  <span>{user?.email || (isAdmin ? 'Administrator' : 'Creator')}</span>
                </div>
              </div>

              {isAdmin ? (
                <Link
                  to="/admin/dashboard"
                  className="btn btn-gold w-full text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  ✦ Open Admin Portal &rarr;
                </Link>
              ) : (
                <Link
                  to="/creator/dashboard"
                  className="btn btn-gold w-full text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  &#9638; Open Creator Dashboard &rarr;
                </Link>
              )}

              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="btn btn-outline w-full text-center cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="mobile-auth-guest">
              <Link
                to="/login"
                className="btn btn-outline w-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/login?tab=register"
                className="btn btn-primary w-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                Join as Creator &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
