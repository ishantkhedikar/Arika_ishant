import React, { useState } from 'react';
import { PORTAL_DATA } from '../../services/portalData';

export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState(PORTAL_DATA.campaigns.items);
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    brand: '',
    category: 'Beauty',
    budget: '₹3,00,000',
    creators: '8 Creators',
    timeline: '01 Oct – 31 Oct'
  });

  const filtered = campaigns.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.brand.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e) => {
    e.preventDefault();
    const created = {
      id: `cmp-${Date.now()}`,
      name: newCampaign.name,
      brand: newCampaign.brand,
      brandLogo: '/assets/images/brand-placeholder.svg',
      category: newCampaign.category,
      categoryClass: newCampaign.category.toLowerCase(),
      budget: newCampaign.budget,
      creators: newCampaign.creators,
      timeline: newCampaign.timeline,
      status: 'Active',
      statusClass: 'active'
    };
    setCampaigns([created, ...campaigns]);
    setShowCreateModal(false);
    setNewCampaign({
      name: '',
      brand: '',
      category: 'Beauty',
      budget: '₹3,00,000',
      creators: '8 Creators',
      timeline: '01 Oct – 31 Oct'
    });
  };

  return (
    <div className="admin-page-content">
      <div className="portal-header-row">
        <div>
          <h1>Campaigns</h1>
          <p className="portal-header-subtitle">
            Manage active client brand initiatives, budgets, milestones and creator contracts.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary cursor-pointer"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Campaign
        </button>
      </div>

      {/* Metrics */}
      <section className="portal-stats-grid">
        {PORTAL_DATA.campaigns.stats.map((s) => (
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
            placeholder="Search campaigns by title, brand, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="table-count-text">
          Showing {filtered.length} of {campaigns.length} campaigns
        </span>
      </div>

      {/* Campaigns Table */}
      <div className="card-panel">
        <div className="table-responsive">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Budget</th>
                <th>Roster</th>
                <th>Timeline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={item.brandLogo}
                        alt={item.brand}
                        style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <span>{item.brand}</span>
                    </div>
                  </td>
                  <td>
                    <span className="category-pill">{item.category}</span>
                  </td>
                  <td>
                    <strong>{item.budget}</strong>
                  </td>
                  <td>{item.creators}</td>
                  <td className="text-muted">{item.timeline}</td>
                  <td>
                    <span className={`status-badge status-${item.statusClass}`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div
          className="creator-modal-overlay active"
          onClick={() => setShowCreateModal(false)}
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
              onClick={() => setShowCreateModal(false)}
            >
              &times;
            </button>
            <h3>Create New Campaign</h3>
            <form onSubmit={handleCreate} style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>
                  Campaign Title *
                </label>
                <input
                  type="text"
                  required
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCampaign.brand}
                  onChange={(e) => setNewCampaign({ ...newCampaign, brand: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>
                  Category
                </label>
                <select
                  value={newCampaign.category}
                  onChange={(e) => setNewCampaign({ ...newCampaign, category: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px' }}
                >
                  <option>Beauty</option>
                  <option>Fashion</option>
                  <option>Lifestyle</option>
                  <option>Fitness</option>
                  <option>Tech</option>
                  <option>Food</option>
                </select>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>
                  Budget (e.g. ₹5,00,000)
                </label>
                <input
                  type="text"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>
                  Timeline (e.g. 15 Oct – 15 Nov)
                </label>
                <input
                  type="text"
                  value={newCampaign.timeline}
                  onChange={(e) => setNewCampaign({ ...newCampaign, timeline: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px' }}
                />
              </div>

              <button type="submit" className="btn btn-primary w-full cursor-pointer">
                Launch Campaign &rarr;
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
