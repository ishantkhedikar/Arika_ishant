import React, { useState } from 'react';
import { creatorService } from '../../services/creatorService';

const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'under-review', label: 'Under Review' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' }
];

const BADGE_MAP = {
  'in-progress': ['db-badge--progress', 'In Progress'],
  'under-review': ['db-badge--review', 'Under Review'],
  'upcoming': ['db-badge--upcoming', 'Upcoming'],
  'completed': ['db-badge--completed', 'Completed']
};

export default function CreatorCollaborations() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [activeCollab, setActiveCollab] = useState(null);
  const [draftLink, setDraftLink] = useState('');
  const [submitFeedback, setSubmitFeedback] = useState('');

  const items = creatorService.getCollaborations({
    status: activeTab,
    search
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const handleSubmitDraft = (e) => {
    e.preventDefault();
    if (!draftLink) return;
    setSubmitFeedback('Draft submitted successfully! The agency review team has been notified.');
    setTimeout(() => {
      setSubmitFeedback('');
      setActiveCollab(null);
      setDraftLink('');
    }, 1800);
  };

  return (
    <div className="db-content">
      <div className="db-page-header" style={{ marginBottom: '24px' }}>
        <h2>Collaborations</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Review deliverables, track submission deadlines, and upload your draft assets.
        </p>
      </div>

      {/* Controls Bar: Search & Status Filters */}
      <div className="db-collabs-controls">
        <div className="db-tabs">
          {STATUS_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`db-tab-btn cursor-pointer ${activeTab === t.key ? 'active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="db-search-box">
          <input
            type="text"
            placeholder="Search brand, deliverable..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="db-section-card" style={{ marginTop: '20px' }}>
        {items.length === 0 ? (
          <div className="db-empty-state" style={{ padding: '48px', textAlign: 'center' }}>
            <p>No collaborations found matching your filter criteria.</p>
          </div>
        ) : (
          <ul className="db-collab-list">
            {items.map((c) => {
              const [badgeCls, badgeLabel] = BADGE_MAP[c.status] || ['', c.status];
              return (
                <li
                  key={c.id}
                  className="db-collab-item cursor-pointer"
                  onClick={() => setActiveCollab(c)}
                >
                  <img
                    src={c.thumbnailUrl}
                    alt={c.brandName}
                    className="db-collab-thumb"
                    onError={(e) => {
                      e.target.style.background = '#EADCC8';
                    }}
                  />

                  <div className="db-collab-info">
                    <span className="db-collab-brand">{c.brandName}</span>
                    <span className="db-collab-meta">
                      {c.contentType} &middot; {c.deliverable} &middot; {c.platform}
                    </span>
                    <span className="db-collab-due">Due: {formatDate(c.deadline)}</span>
                  </div>

                  <div className="db-collab-right">
                    <span className={`db-badge ${badgeCls}`}>{badgeLabel}</span>
                    <button
                      type="button"
                      className="btn btn-outline"
                      style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCollab(c);
                      }}
                    >
                      View Brief &rarr;
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Collaboration Detail & Draft Submission Modal */}
      {activeCollab && (
        <div
          className="creator-modal-overlay active"
          onClick={() => setActiveCollab(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="creator-modal"
            style={{ maxWidth: '540px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="creator-modal__close cursor-pointer"
              onClick={() => setActiveCollab(null)}
            >
              &times;
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <img
                src={activeCollab.thumbnailUrl}
                alt={activeCollab.brandName}
                style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'contain' }}
              />
              <div>
                <h3 style={{ margin: 0 }}>{activeCollab.brandName}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Campaign: {activeCollab.campaignName}
                </span>
              </div>
            </div>

            <div className="creator-modal__stats" style={{ margin: '16px 0' }}>
              <div>
                <strong>{activeCollab.contentType}</strong>
                <span>Format</span>
              </div>
              <div>
                <strong>{activeCollab.platform}</strong>
                <span>Platform</span>
              </div>
              <div>
                <strong>{formatDate(activeCollab.deadline)}</strong>
                <span>Deadline</span>
              </div>
            </div>

            <div style={{ margin: '20px 0', fontSize: '0.9rem', lineHeight: 1.5 }}>
              <p>
                <strong>Deliverable Guidelines:</strong>
              </p>
              <ul style={{ paddingLeft: '20px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                <li>Feature product in first 3 seconds of the reel.</li>
                <li>Tag official brand account in the caption and on-screen sticker.</li>
                <li>Submit unlisted draft or Google Drive / Frame.io review link below.</li>
              </ul>
            </div>

            {submitFeedback ? (
              <div
                style={{
                  background: '#DCFCE7',
                  color: '#16A34A',
                  padding: '12px',
                  borderRadius: '6px',
                  textAlign: 'center'
                }}
              >
                {submitFeedback}
              </div>
            ) : (
              <form onSubmit={handleSubmitDraft}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Submit Draft Link for Review:
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/... or Instagram preview"
                  value={draftLink}
                  onChange={(e) => setDraftLink(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid #E5E7EB',
                    marginBottom: '14px'
                  }}
                />
                <button type="submit" className="btn btn-gold w-full cursor-pointer">
                  Submit Draft for Agency Sign-off &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
