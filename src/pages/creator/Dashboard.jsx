import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { creatorService } from '../../services/creatorService';
import { useAuth } from '../../context/AuthContext';

const BADGE_MAP = {
  'in-progress': ['db-badge--progress', 'In Progress'],
  'under-review': ['db-badge--review', 'Under Review'],
  'upcoming': ['db-badge--upcoming', 'Upcoming'],
  'completed': ['db-badge--completed', 'Completed']
};

export default function CreatorDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = () => {
    setLoading(true);
    setError(null);
    try {
      const res = creatorService.getDashboardData();
      setData(res);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="db-content">
      {/* Loading State */}
      {loading && (
        <div className="db-loading-state" style={{ padding: '60px', textAlign: 'center' }}>
          <div className="db-spinner" style={{ margin: '0 auto 16px' }} />
          <p>Loading your dashboard...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="db-error-state" style={{ padding: '60px', textAlign: 'center' }}>
          <p style={{ color: '#DC2626', marginBottom: '16px' }}>{error}</p>
          <button type="button" className="btn btn-outline" onClick={loadData}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && data && (
        <>
          {/* Welcome Banner */}
          <div className="db-welcome-card" style={{ marginBottom: '24px' }}>
            <div className="db-welcome-text">
              <h2>
                Hello, {user?.name?.split(' ')[0] || data.creator.firstName || 'Priya'} ✦
              </h2>
              <p>
                Track your active brand collaborations, milestones, content reviews, and performance.
              </p>
            </div>
            <Link to="/creator/collaborations" className="btn btn-gold">
              View All Collaborations &rarr;
            </Link>
          </div>

          {/* Metric Stats Cards */}
          <div className="db-stats-grid">
            <div className="db-stat-card">
              <span className="db-stat-label">Active Collaborations</span>
              <span className="db-stat-val text-gold">{data.stats.activeCollaborations}</span>
              <span className="db-stat-sub">In progress deliverables</span>
            </div>
            <div className="db-stat-card">
              <span className="db-stat-label">Upcoming Campaigns</span>
              <span className="db-stat-val">{data.stats.upcomingCollaborations}</span>
              <span className="db-stat-sub">Scheduled launches</span>
            </div>
            <div className="db-stat-card">
              <span className="db-stat-label">Completed Deliverables</span>
              <span className="db-stat-val text-green">{data.stats.completedCollaborations}</span>
              <span className="db-stat-sub">Successfully published</span>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="db-quick-actions" style={{ margin: '24px 0' }}>
            <Link to="/creator/collaborations" className="db-action-pill">
              <span>✦</span> Manage Campaigns
            </Link>
            <Link to="/creator/profile" className="db-action-pill">
              <span>✎</span> Update Profile & Media Kit
            </Link>
            <Link to="/creator/contact" className="db-action-pill">
              <span>✉</span> Message Agency Support
            </Link>
          </div>

          {/* Recent Collaborations Section */}
          <div className="db-section-card">
            <div className="db-section-header">
              <h3>Recent Collaborations</h3>
              <Link to="/creator/collaborations" className="link-muted">
                See all &rarr;
              </Link>
            </div>

            {data.recentCollaborations.length === 0 ? (
              <div className="db-empty-state" style={{ padding: '36px', textAlign: 'center' }}>
                <p>No collaborations yet. Your accepted brand deals will appear here!</p>
              </div>
            ) : (
              <ul className="db-collab-list">
                {data.recentCollaborations.map((c) => {
                  const [badgeCls, badgeLabel] = BADGE_MAP[c.status] || ['', c.status];
                  return (
                    <li key={c.id} className="db-collab-item">
                      {c.thumbnailUrl ? (
                        <img
                          src={c.thumbnailUrl}
                          alt={c.brandName}
                          className="db-collab-thumb"
                          onError={(e) => {
                            e.target.style.background = '#EADCC8';
                          }}
                        />
                      ) : (
                        <div className="db-collab-thumb" />
                      )}

                      <div className="db-collab-info">
                        <span className="db-collab-brand">{c.brandName}</span>
                        <span className="db-collab-meta">
                          {c.contentType} &middot; {c.deliverable}
                        </span>
                        <span className="db-collab-due">Due: {formatDate(c.deadline)}</span>
                      </div>

                      <div className="db-collab-right">
                        <span className={`db-badge ${badgeCls}`}>{badgeLabel}</span>
                        <Link
                          to="/creator/collaborations"
                          className="db-collab-arrow"
                          aria-label="View collaboration"
                        >
                          <svg viewBox="0 0 24 24" fill="none">
                            <path
                              d="M5 12h14M12 5l7 7-7 7"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
