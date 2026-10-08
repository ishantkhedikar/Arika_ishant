import React, { useState } from 'react';
import { PORTAL_DATA } from '../../services/portalData';

export default function AdminContent() {
  const [items, setItems] = useState(PORTAL_DATA.content.items);
  const [search, setSearch] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);

  const filtered = items.filter(
    (i) =>
      !search ||
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.creator.toLowerCase().includes(search.toLowerCase()) ||
      i.campaign.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page-content">
      <div className="portal-header-row">
        <div>
          <h1>Content Deliverables</h1>
          <p className="portal-header-subtitle">
            Catalog published Instagram assets, media formats, views, and creator engagement.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <section className="portal-stats-grid">
        {PORTAL_DATA.content.stats.map((s) => (
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

      {/* Search */}
      <div className="table-controls-bar">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search assets by title, creator, campaign..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="table-count-text">
          Showing {filtered.length} of {items.length} deliverables
        </span>
      </div>

      {/* Table */}
      <div className="card-panel">
        <div className="table-responsive">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Asset / Post</th>
                <th>Creator</th>
                <th>Campaign</th>
                <th>Format</th>
                <th>Impressions</th>
                <th>Engagement</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={item.thumb}
                        alt={item.title}
                        style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <strong style={{ maxWidth: '200px', display: 'inline-block' }}>{item.title}</strong>
                    </div>
                  </td>
                  <td>{item.creator}</td>
                  <td>{item.campaign}</td>
                  <td>
                    <span className="category-pill">{item.format}</span>
                  </td>
                  <td>
                    <strong>{item.views}</strong>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem' }}>
                      {item.likes} likes &middot; {item.shares} shares
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${item.statusClass}`}>{item.status}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-xs cursor-pointer"
                      onClick={() => setSelectedAsset(item)}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset Preview Modal */}
      {selectedAsset && (
        <div
          className="creator-modal-overlay active"
          onClick={() => setSelectedAsset(null)}
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
              onClick={() => setSelectedAsset(null)}
            >
              &times;
            </button>
            <img
              src={selectedAsset.thumb}
              alt={selectedAsset.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
            />
            <span className="category-pill">{selectedAsset.format}</span>
            <h3 style={{ marginTop: '8px', marginBottom: '4px' }}>{selectedAsset.title}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Creator: {selectedAsset.creator} &middot; Campaign: {selectedAsset.campaign}
            </p>

            <div className="creator-modal__stats" style={{ margin: '20px 0' }}>
              <div>
                <strong>{selectedAsset.views}</strong>
                <span>Views / Plays</span>
              </div>
              <div>
                <strong>{selectedAsset.likes}</strong>
                <span>Total Likes</span>
              </div>
              <div>
                <strong>{selectedAsset.shares}</strong>
                <span>Direct Shares</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-full cursor-pointer"
              onClick={() => setSelectedAsset(null)}
            >
              Done &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
