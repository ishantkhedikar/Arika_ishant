import React, { useState } from 'react';
import { PORTAL_DATA } from '../../services/portalData';

export default function AdminCollaborations() {
  const [items, setItems] = useState(PORTAL_DATA.collaborations.items);
  const [search, setSearch] = useState('');
  const [selectedCollab, setSelectedCollab] = useState(null);

  const filtered = items.filter(
    (c) =>
      !search ||
      c.campaign.toLowerCase().includes(search.toLowerCase()) ||
      c.creator.toLowerCase().includes(search.toLowerCase()) ||
      c.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStatus = (id, newStatus, newClass) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus, statusClass: newClass } : item
      )
    );
    setSelectedCollab(null);
  };

  return (
    <div className="admin-page-content">
      <div className="portal-header-row">
        <div>
          <h1>Collaborations</h1>
          <p className="portal-header-subtitle">
            Supervise live creator milestones, deliverable drafts, reviews and payments.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <section className="portal-stats-grid">
        {PORTAL_DATA.collaborations.stats.map((s) => (
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

      {/* Controls */}
      <div className="table-controls-bar">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search campaign, creator, brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="table-count-text">
          Showing {filtered.length} of {items.length} records
        </span>
      </div>

      {/* Table */}
      <div className="card-panel">
        <div className="table-responsive">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Brand</th>
                <th>Assigned Creator</th>
                <th>Deliverable</th>
                <th>Deadline</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.campaign}</strong>
                  </td>
                  <td>{item.brand}</td>
                  <td>
                    <div className="table-user-cell">
                      <img src={item.avatar} alt={item.creator} className="table-avatar" />
                      <div>
                        <strong className="table-user-name">{item.creator}</strong>
                        <span className="table-user-handle">{item.handle}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.deliverable}</td>
                  <td className="text-muted">{item.deadline}</td>
                  <td>
                    <span className={`status-badge status-${item.statusClass}`}>{item.status}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-xs cursor-pointer"
                      onClick={() => setSelectedCollab(item)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Status Modal */}
      {selectedCollab && (
        <div
          className="creator-modal-overlay active"
          onClick={() => setSelectedCollab(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="creator-modal"
            style={{ maxWidth: '480px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="creator-modal__close cursor-pointer"
              onClick={() => setSelectedCollab(null)}
            >
              &times;
            </button>
            <h3>Update Collaboration Status</h3>
            <p style={{ margin: '8px 0 16px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              {selectedCollab.campaign} &middot; {selectedCollab.creator}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-outline cursor-pointer"
                onClick={() => handleUpdateStatus(selectedCollab.id, 'In Progress', 'active')}
              >
                In Progress
              </button>
              <button
                type="button"
                className="btn btn-outline cursor-pointer"
                onClick={() => handleUpdateStatus(selectedCollab.id, 'Content Review', 'review')}
              >
                Content Review
              </button>
              <button
                type="button"
                className="btn btn-outline cursor-pointer"
                onClick={() => handleUpdateStatus(selectedCollab.id, 'Awaiting Contract', 'pending')}
              >
                Awaiting Contract
              </button>
              <button
                type="button"
                className="btn btn-primary cursor-pointer"
                onClick={() => handleUpdateStatus(selectedCollab.id, 'Completed', 'completed')}
              >
                Mark Completed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
