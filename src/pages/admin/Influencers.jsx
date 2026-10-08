import React, { useState } from 'react';
import { PORTAL_DATA } from '../../services/portalData';

export default function AdminInfluencers() {
  const [items, setItems] = useState(PORTAL_DATA.influencers.items);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

  const filtered = items.filter((item) => {
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.handle.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || item.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleStatusChange = (id, newStatus, newStatusClass) => {
    setItems((prev) =>
      prev.map((inf) =>
        inf.id === id ? { ...inf, status: newStatus, statusClass: newStatusClass } : inf
      )
    );
    setSelectedInfluencer(null);
  };

  return (
    <div className="admin-page-content">
      {/* Header */}
      <div className="portal-header-row">
        <div>
          <h1>Influencers Management</h1>
          <p className="portal-header-subtitle">
            Curate verified talent rosters, track audience performance and approve new applicants.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <section className="portal-stats-grid">
        {PORTAL_DATA.influencers.stats.map((s) => (
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

      {/* Filter and Search Bar */}
      <div className="table-controls-bar">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search by name, handle, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-select-wrapper">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Fashion">Fashion</option>
            <option value="Beauty">Beauty</option>
            <option value="Fitness">Fitness</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Food">Food</option>
            <option value="Tech">Tech</option>
            <option value="Travel">Travel</option>
            <option value="Wellness">Wellness</option>
          </select>
        </div>

        <span className="table-count-text">
          Showing {filtered.length} of {items.length} creators
        </span>
      </div>

      {/* Table Panel */}
      <div className="card-panel">
        <div className="table-responsive">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Influencer</th>
                <th>Category</th>
                <th>Followers</th>
                <th>Engagement</th>
                <th>Location</th>
                <th>Status</th>
                <th>Joined</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="table-user-cell">
                      <img src={item.avatar} alt={item.name} className="table-avatar" />
                      <div>
                        <strong className="table-user-name">{item.name}</strong>
                        <span className="table-user-handle">{item.handle}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="category-pill">{item.category}</span>
                  </td>
                  <td>
                    <strong>{item.followers}</strong>
                  </td>
                  <td>{item.engagement}</td>
                  <td>{item.location}</td>
                  <td>
                    <span className={`status-badge status-${item.statusClass}`}>{item.status}</span>
                  </td>
                  <td className="text-muted">{item.joined}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-xs cursor-pointer"
                      onClick={() => setSelectedInfluencer(item)}
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Influencer Manage Modal */}
      {selectedInfluencer && (
        <div
          className="creator-modal-overlay active"
          onClick={() => setSelectedInfluencer(null)}
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
              onClick={() => setSelectedInfluencer(null)}
            >
              &times;
            </button>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
              <img
                src={selectedInfluencer.avatar}
                alt={selectedInfluencer.name}
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ margin: 0 }}>{selectedInfluencer.name}</h3>
                <span style={{ color: 'var(--color-signature-gold)', fontWeight: 600 }}>
                  {selectedInfluencer.handle}
                </span>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  {selectedInfluencer.location} &middot; {selectedInfluencer.category}
                </p>
              </div>
            </div>

            <div className="creator-modal__stats" style={{ margin: '16px 0' }}>
              <div>
                <strong>{selectedInfluencer.followers}</strong>
                <span>Followers</span>
              </div>
              <div>
                <strong>{selectedInfluencer.engagement}</strong>
                <span>Engagement</span>
              </div>
              <div>
                <strong>{selectedInfluencer.status}</strong>
                <span>Status</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                className="btn btn-primary flex-1 cursor-pointer"
                onClick={() => handleStatusChange(selectedInfluencer.id, 'Approved', 'approved')}
              >
                Set Approved
              </button>
              <button
                type="button"
                className="btn btn-outline flex-1 cursor-pointer"
                onClick={() =>
                  handleStatusChange(selectedInfluencer.id, 'Under Review', 'review')
                }
              >
                Set Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
