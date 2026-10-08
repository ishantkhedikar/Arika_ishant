import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DASHBOARD_DATA } from '../../services/portalData';
import PerformanceChart from '../../components/PerformanceChart';

export default function AdminDashboard() {
  const [applications, setApplications] = useState(DASHBOARD_DATA.applications);
  const [selectedApp, setSelectedApp] = useState(null);

  const handleUpdateStatus = (id, newStatus, newType) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus, statusType: newType } : app
      )
    );
    setSelectedApp(null);
  };

  return (
    <div className="admin-page-content">
      {/* ============ HERO BANNER ============ */}
      <section className="admin-hero-banner">
        <div className="hero-banner-content">
          <span className="hero-eyebrow">{DASHBOARD_DATA.hero.eyebrow}</span>
          <h1 className="hero-title">
            {DASHBOARD_DATA.hero.greeting} <span className="wave-emoji">{DASHBOARD_DATA.hero.emoji}</span>
          </h1>
          <p className="hero-subtitle">{DASHBOARD_DATA.hero.subtitle}</p>
        </div>

        <div className="hero-motto-card">
          <div className="motto-row motto-row--top">
            {DASHBOARD_DATA.hero.motto.col1.map((w, i) => (
              <span key={i} className={w === '✦' ? 'motto-sparkle' : ''}>
                {w}
              </span>
            ))}
          </div>
          <div className="motto-divider" />
          <div className="motto-row motto-row--bottom">
            {DASHBOARD_DATA.hero.motto.col2.map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STAT CARDS GRID ============ */}
      <section className="portal-stats-grid" id="portal-stats-grid">
        {DASHBOARD_DATA.stats.map((stat) => (
          <Link to={stat.link} key={stat.id} className="stat-card">
            <div className="stat-card-header">
              <div
                className="stat-icon-wrapper"
                style={{ backgroundColor: stat.iconBg, color: stat.iconColor }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="stat-body">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.title}</span>
              </div>
            </div>
            <div className="stat-card-footer">
              <div className="stat-trend-group">
                <span className="trend-badge trend-badge--up">{stat.change}</span>
                <span className="trend-period">{stat.period}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* ============ MAIN TWO-COLUMN DASHBOARD GRID ============ */}
      <div className="dashboard-grid-layout">
        {/* LEFT COLUMN: Pending Applications */}
        <section className="card-panel">
          <div className="panel-header">
            <div>
              <h3>Recent Creator Applications</h3>
              <p className="panel-subtitle">Review new talent registrations awaiting sign-off.</p>
            </div>
            <Link to="/admin/influencers" className="btn btn-outline btn-sm">
              View All &rarr;
            </Link>
          </div>

          <div className="table-responsive">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Creator</th>
                  <th>Category</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div className="table-user-cell">
                        <img src={app.avatar} alt={app.name} className="table-avatar" />
                        <span className="table-user-name">{app.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="category-pill">{app.category}</span>
                    </td>
                    <td className="text-muted">{app.time}</td>
                    <td>
                      <span className={`status-badge status-${app.statusType}`}>{app.status}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="btn btn-outline btn-xs cursor-pointer"
                        onClick={() => setSelectedApp(app)}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* RIGHT COLUMN: Performance & Quick Actions */}
        <div className="dashboard-side-stack">
          {/* Performance Chart Card */}
          <section className="card-panel">
            <div className="panel-header">
              <div>
                <h3>Campaign Performance</h3>
                <p className="panel-subtitle">Reach and engagement curve (Last 30 Days)</p>
              </div>
              <span className="status-badge status-approved">{DASHBOARD_DATA.performance.growth}</span>
            </div>

            <div className="chart-wrapper" style={{ padding: '12px 0' }}>
              <PerformanceChart />
            </div>

            <div className="perf-metric-summary">
              <div>
                <strong>{DASHBOARD_DATA.performance.reach}</strong>
                <span>{DASHBOARD_DATA.performance.reachLabel}</span>
              </div>
              <div>
                <strong>{DASHBOARD_DATA.performance.engagements}</strong>
                <span>{DASHBOARD_DATA.performance.engagementLabel}</span>
              </div>
            </div>
          </section>

          {/* Quick Actions Card */}
          <section className="card-panel">
            <div className="panel-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="quick-actions-grid">
              {DASHBOARD_DATA.quickActions.map((qa) => (
                <Link
                  to={qa.link}
                  key={qa.id}
                  className="quick-action-card"
                  style={{ backgroundColor: qa.bgColor }}
                >
                  <span className="qa-icon" style={{ color: qa.iconColor }}>
                    ✦
                  </span>
                  <span className="qa-title">{qa.title}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Application Review Modal */}
      {selectedApp && (
        <div
          className="creator-modal-overlay active"
          onClick={() => setSelectedApp(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="creator-modal"
            style={{ maxWidth: '500px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="creator-modal__close cursor-pointer"
              onClick={() => setSelectedApp(null)}
            >
              &times;
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <img
                src={selectedApp.avatar}
                alt={selectedApp.name}
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ margin: 0 }}>{selectedApp.name}</h3>
                <span className="category-pill">{selectedApp.category}</span>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Submitted: {selectedApp.time}
                </p>
              </div>
            </div>

            <div style={{ margin: '20px 0', padding: '16px', background: '#FDFBF7', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>
                <strong>Current Status:</strong>{' '}
                <span className={`status-badge status-${selectedApp.statusType}`}>
                  {selectedApp.status}
                </span>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                type="button"
                className="btn btn-primary flex-1 cursor-pointer"
                onClick={() => handleUpdateStatus(selectedApp.id, 'Approved', 'approved')}
              >
                Approve & Onboard
              </button>
              <button
                type="button"
                className="btn btn-outline flex-1 cursor-pointer"
                onClick={() => handleUpdateStatus(selectedApp.id, 'Under Review', 'review')}
              >
                Mark Under Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
