import React, { useState } from 'react';

const POSTS = [
  { id: 1, type: 'image', category: 'campaigns', bg: '/assets/images/ig-tile-1.svg', text: '' },
  { id: 2, type: 'image', category: 'campaigns', bg: '/assets/images/ig-tile-2.svg', text: '' },
  { id: 3, type: 'text', category: 'tips-insights', bg: '', text: 'Great brands work with great creators.' },
  { id: 4, type: 'image', category: 'behind-the-scenes', bg: '/assets/images/ig-tile-3.svg', text: '' },
  { id: 5, type: 'text', category: 'tips-insights', bg: '', text: 'Authentic content creates real connections.' },
  { id: 6, type: 'image', category: 'behind-the-scenes', bg: '/assets/images/ig-tile-4.svg', text: '' },
  { id: 7, type: 'image', category: 'campaigns', bg: '/assets/images/ig-tile-5.svg', text: '' },
  { id: 8, type: 'image', category: 'creator-stories', bg: '/assets/images/ig-tile-6.svg', text: '' },
  { id: 9, type: 'text', category: 'tips-insights', bg: '', text: 'Ideas · Creativity · Campaigns · Impact' },
  { id: 10, type: 'image', category: 'team', bg: '/assets/images/ig-tile-1.svg', text: '' },
  { id: 11, type: 'text', category: 'tips-insights', bg: '', text: 'Creators turn ideas into impact.' },
  { id: 12, type: 'image', category: 'campaigns', bg: '/assets/images/ig-tile-2.svg', text: '' }
];

export default function Instagram() {
  const [filter, setFilter] = useState('all');

  const filterTabs = [
    { key: 'all', label: 'All' },
    { key: 'campaigns', label: 'Campaigns' },
    { key: 'behind-the-scenes', label: 'Behind the Scenes' },
    { key: 'creator-stories', label: 'Creator Stories' },
    { key: 'tips-insights', label: 'Tips & Insights' },
    { key: 'team', label: 'Team' }
  ];

  const filtered = POSTS.filter((p) => filter === 'all' || p.category === filter);

  return (
    <div className="instagram-page">
      {/* ============ HERO ============ */}
      <section className="section ig-hero">
        <div className="container ig-hero__grid">
          <div>
            <span className="eyebrow">On Instagram</span>
            <h1>
              Behind the scenes. Real stories.{' '}
              <span className="text-gold">Daily inspiration.</span>
            </h1>
            <p>
              Follow us on Instagram for the latest campaigns, creator content, industry insights
              and a glimpse into life at Arika Collabs.
            </p>
            <a
              href="https://instagram.com/arikacollabs"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Follow @arikacollabs &rarr;
            </a>
          </div>
          <div className="ig-hero__visual" />
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="container ig-stats">
        <div>
          <span className="ig-stat-icon">&#128247;</span>
          <strong>12K+</strong>
          <span>Followers</span>
        </div>
        <div>
          <span className="ig-stat-icon">&#10084;</span>
          <strong>250+</strong>
          <span>Posts</span>
        </div>
        <div>
          <span className="ig-stat-icon">&#128101;</span>
          <strong>Real</strong>
          <span>Campaigns</span>
        </div>
        <div>
          <span className="ig-stat-icon">&#10022;</span>
          <strong>A Creative</strong>
          <span>Community</span>
        </div>
      </section>

      {/* ============ FILTERS ============ */}
      <section className="container filter-bar">
        <div className="filter-tabs">
          {filterTabs.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`filter-tab cursor-pointer ${filter === t.key ? 'active' : ''}`}
              onClick={() => setFilter(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* ============ POST GRID ============ */}
      <section className="section">
        <div className="container">
          <div className="grid ig-grid">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`ig-tile ${item.type === 'text' ? 'ig-tile--text' : ''}`}
                style={item.bg ? { backgroundImage: `url('${item.bg}')` } : {}}
              >
                {item.text || ''}
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
            <a
              href="https://instagram.com/arikacollabs"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Follow Us on Instagram &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
