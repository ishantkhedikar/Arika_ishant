import React from 'react';
import { PORTAL_DATA } from '../../services/portalData';

export default function AdminAnalytics() {
  const { stats, nicheBreakdown, monthlyGrowth } = PORTAL_DATA.analytics;

  return (
    <div className="admin-page-content">
      <div className="portal-header-row">
        <div>
          <h1>Analytics & Intelligence</h1>
          <p className="portal-header-subtitle">
            Consolidated platform reach metrics, ROI benchmarks, audience retention and growth.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <section className="portal-stats-grid">
        {stats.map((s) => (
          <div key={s.id} className="stat-card">
            <div className="stat-card-header">
              <div
                className="stat-icon-wrapper"
                style={{ backgroundColor: s.iconBg, color: s.iconColor }}
              >
                <span>✦</span>
              </div>
              <div className="stat-body">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.title}</span>
              </div>
            </div>
            <div className="stat-card-footer">
              <span className="trend-badge trend-badge--up">{s.change}</span>
              <span className="trend-period">{s.period}</span>
            </div>
          </div>
        ))}
      </section>

      <div className="dashboard-grid-layout" style={{ marginTop: '24px' }}>
        {/* Niche Breakdown */}
        <section className="card-panel">
          <div className="panel-header">
            <h3>Campaign Reach by Creator Niche</h3>
            <span className="badge-pill">Q3 Benchmark</span>
          </div>
          <div style={{ padding: '8px 0' }}>
            {nicheBreakdown.map((n, i) => (
              <div key={i} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                  <strong>{n.niche}</strong>
                  <span>{n.percentage}%</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    background: '#F0EBE2',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      width: `${n.percentage}%`,
                      height: '100%',
                      background: n.color,
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Monthly Performance Growth */}
        <section className="card-panel">
          <div className="panel-header">
            <h3>Monthly Growth Trajectory</h3>
            <span className="badge-pill">2026 Season</span>
          </div>

          <div className="table-responsive">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Total Reach</th>
                  <th>Delivered ROI</th>
                  <th>New Collabs</th>
                </tr>
              </thead>
              <tbody>
                {monthlyGrowth.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <strong>{row.month} 2026</strong>
                    </td>
                    <td>{row.reach}</td>
                    <td>
                      <span className="status-badge status-approved">{row.roi}</span>
                    </td>
                    <td>+{row.collabs} active</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
