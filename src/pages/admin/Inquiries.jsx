import React, { useState } from 'react';
import { PORTAL_DATA } from '../../services/portalData';

export default function AdminInquiries() {
  const [items, setItems] = useState(PORTAL_DATA.inquiries.items);
  const [search, setSearch] = useState('');
  const [activeInquiry, setActiveInquiry] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replySuccess, setReplySuccess] = useState(false);

  const filtered = items.filter(
    (i) =>
      !search ||
      i.sender.toLowerCase().includes(search.toLowerCase()) ||
      i.org.toLowerCase().includes(search.toLowerCase()) ||
      i.message.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!activeInquiry) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === activeInquiry.id ? { ...i, status: 'Replied', statusClass: 'replied' } : i
      )
    );
    setReplySuccess(true);
    setTimeout(() => {
      setReplySuccess(false);
      setActiveInquiry(null);
      setReplyText('');
    }, 1500);
  };

  return (
    <div className="admin-page-content">
      <div className="portal-header-row">
        <div>
          <h1>Inquiries & Outreach</h1>
          <p className="portal-header-subtitle">
            Respond to creator onboarding requests and inbound brand sponsorship proposals.
          </p>
        </div>
      </div>

      {/* Stats */}
      <section className="portal-stats-grid">
        {PORTAL_DATA.inquiries.stats.map((s) => (
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
            placeholder="Search by sender, company or inquiry keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="table-count-text">
          Showing {filtered.length} of {items.length} inquiries
        </span>
      </div>

      {/* Table */}
      <div className="card-panel">
        <div className="table-responsive">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Sender</th>
                <th>Organization</th>
                <th>Type</th>
                <th>Message Excerpt</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.sender}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      {item.email}
                    </div>
                  </td>
                  <td>{item.org}</td>
                  <td>
                    <span className="category-pill">{item.type}</span>
                  </td>
                  <td style={{ maxWidth: '280px' }}>
                    <p
                      style={{
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {item.message}
                    </p>
                  </td>
                  <td className="text-muted">{item.date}</td>
                  <td>
                    <span className={`status-badge status-${item.statusClass}`}>{item.status}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-xs cursor-pointer"
                      onClick={() => setActiveInquiry(item)}
                    >
                      View & Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Reply Modal */}
      {activeInquiry && (
        <div
          className="creator-modal-overlay active"
          onClick={() => setActiveInquiry(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="creator-modal"
            style={{ maxWidth: '520px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="creator-modal__close cursor-pointer"
              onClick={() => setActiveInquiry(null)}
            >
              &times;
            </button>
            <span className="category-pill">{activeInquiry.type}</span>
            <h3 style={{ marginTop: '8px', marginBottom: '2px' }}>{activeInquiry.sender}</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {activeInquiry.org} &middot; {activeInquiry.email} &middot; {activeInquiry.date}
            </span>

            <div
              style={{
                margin: '16px 0',
                padding: '16px',
                background: '#FDFBF7',
                borderRadius: '8px',
                border: '1px solid #F0EBE2'
              }}
            >
              <strong style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem' }}>
                Inquiry Message:
              </strong>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
                {activeInquiry.message}
              </p>
            </div>

            {replySuccess ? (
              <div
                style={{
                  background: '#DCFCE7',
                  color: '#16A34A',
                  padding: '12px',
                  borderRadius: '6px',
                  textAlign: 'center'
                }}
              >
                ✓ Response dispatched to {activeInquiry.email}!
              </div>
            ) : (
              <form onSubmit={handleSendReply}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Write Direct Response:
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Draft your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', marginBottom: '14px' }}
                />
                <button type="submit" className="btn btn-primary w-full cursor-pointer">
                  Send Official Email Reply &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
