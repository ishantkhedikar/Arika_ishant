import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CAMPAIGNS = [
  {
    id: 'glow-ritual',
    title: 'Glow Ritual Series',
    brand: 'AURÉA',
    category: 'beauty',
    tag: 'Beauty',
    thumb: '/assets/images/campaign-beauty.svg',
    description: 'A creator-led campaign to launch a new skincare range, focusing on real routines and visible results.',
    reach: '1.2M',
    engagement: '6.4%',
    roi: '3.8x',
    creators: 12,
    deliverables: 'Instagram Reels & Stories'
  },
  {
    id: 'oud-noir',
    title: 'Oud Noir Launch',
    brand: 'VELVET LUXE',
    category: 'fragrance',
    tag: 'Fragrance',
    thumb: '/assets/images/campaign-fragrance.svg',
    description: 'An Instagram campaign to create buzz for a premium fragrance launch through lifestyle creators.',
    reach: '2.1M',
    engagement: '5.9%',
    roi: '4.2x',
    creators: 8,
    deliverables: 'Editorial Reels & Lookbooks'
  },
  {
    id: 'summer-style',
    title: 'Summer Style Edit',
    brand: 'ZARA',
    category: 'fashion',
    tag: 'Fashion',
    thumb: '/assets/images/campaign-fashion.svg',
    description: 'A seasonal campaign featuring top fashion creators showcasing summer staples through reels and stories.',
    reach: '1.8M',
    engagement: '4.7%',
    roi: '3.1x',
    creators: 10,
    deliverables: 'Styling Reels & Static Carousels'
  },
  {
    id: 'everyday-elevated',
    title: 'Everyday Elevated',
    brand: 'BOAT',
    category: 'lifestyle',
    tag: 'Lifestyle',
    thumb: '/assets/images/campaign-lifestyle.svg',
    description: 'A creator campaign highlighting how boAt fits into everyday life — work, travel and beyond.',
    reach: '1.6M',
    engagement: '5.1%',
    roi: '3.6x',
    creators: 15,
    deliverables: 'Daily Routine Vlogs & Unboxings'
  },
  {
    id: 'more-than-skincare',
    title: 'More Than Skincare',
    brand: 'LUMIÈRE',
    category: 'skincare',
    tag: 'Skincare',
    thumb: '/assets/images/campaign-skincare.svg',
    description: 'A storytelling campaign with skincare creators focused on self-care, confidence and real skin journeys.',
    reach: '1.4M',
    engagement: '6.8%',
    roi: '3.9x',
    creators: 9,
    deliverables: 'Before/After Reviews & GRWM Reels'
  },
  {
    id: 'airdopes-campaign',
    title: 'Airdopes Campaign',
    brand: 'BOAT',
    category: 'tech',
    tag: 'Tech',
    thumb: '/assets/images/campaign-tech.svg',
    description: 'A high-impact campaign featuring lifestyle and fitness creators to showcase product features in real-life scenarios.',
    reach: '2.3M',
    engagement: '5.6%',
    roi: '4.1x',
    creators: 14,
    deliverables: 'Workout Shorts & Product Tests'
  }
];

export default function OurWork() {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('recent');
  const [activeModalCampaign, setActiveModalCampaign] = useState(null);

  const filterTabs = [
    { key: 'all', label: 'All' },
    { key: 'beauty', label: 'Beauty' },
    { key: 'fashion', label: 'Fashion' },
    { key: 'lifestyle', label: 'Lifestyle' },
    { key: 'tech', label: 'Tech' },
    { key: 'fragrance', label: 'Fragrance' },
    { key: 'skincare', label: 'Skincare' }
  ];

  const filtered = CAMPAIGNS.filter((c) => filter === 'all' || c.category === filter);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'roi') {
      return parseFloat(b.roi) - parseFloat(a.roi);
    }
    if (sort === 'reach') {
      return parseFloat(b.reach) - parseFloat(a.reach);
    }
    return 0;
  });

  return (
    <div className="our-work-page">
      {/* ============ HERO ============ */}
      <section className="section our-work-hero">
        <div className="container our-work-hero__grid">
          <div>
            <span className="eyebrow">Our Work</span>
            <h1>
              Real brands. <span className="text-gold">Real impact.</span>
            </h1>
            <p>
              From product launches to brand awareness, we've helped brands tell their story through
              the right Instagram creators — with authentic content and measurable results.
            </p>
          </div>
          <div className="our-work-hero__visual" />
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
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="recent">Sort by: Most Recent</option>
          <option value="roi">Sort by: Highest ROI</option>
          <option value="reach">Sort by: Highest Reach</option>
        </select>
      </section>

      {/* ============ CAMPAIGN GRID ============ */}
      <section className="section">
        <div className="container">
          <div className="grid campaign-grid">
            {sorted.map((item) => (
              <div
                key={item.id}
                className="card campaign-card cursor-pointer"
                onClick={() => setActiveModalCampaign(item)}
              >
                <span className="campaign-tag">{item.tag}</span>
                <div
                  className="campaign-thumb"
                  style={{ backgroundImage: `url('${item.thumb}')` }}
                />
                <h3>{item.title}</h3>
                <span className="campaign-brand">{item.brand}</span>
                <p>{item.description}</p>
                <div className="campaign-stats">
                  <span>
                    &#128065; {item.reach} <small>Reach</small>
                  </span>
                  <span>
                    &#10084; {item.engagement} <small>Engagement</small>
                  </span>
                  <span>
                    &#128200; {item.roi} <small>ROI</small>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section className="section section--muted">
        <div className="container cta-banner">
          <div className="cta-banner__visual">
            <span>LET'S CREATE IMPACT TOGETHER</span>
          </div>
          <div className="cta-banner__box">
            <div>
              <strong>Have a campaign in mind?</strong>
              <p>Let's find the right creators and craft a high-impact narrative for your brand.</p>
            </div>
            <Link to="/contact" className="btn btn-primary">
              Start a Campaign &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Campaign Details Modal */}
      {activeModalCampaign && (
        <div
          className="creator-modal-overlay active"
          onClick={() => setActiveModalCampaign(null)}
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
              onClick={() => setActiveModalCampaign(null)}
            >
              &times;
            </button>
            <div
              className="campaign-thumb"
              style={{
                height: '140px',
                borderRadius: '8px',
                backgroundImage: `url('${activeModalCampaign.thumb}')`,
                backgroundSize: 'cover',
                marginBottom: '16px'
              }}
            />
            <span className="campaign-tag">{activeModalCampaign.tag}</span>
            <h3 style={{ marginTop: '8px' }}>{activeModalCampaign.title}</h3>
            <span className="campaign-brand" style={{ display: 'block', marginBottom: '12px' }}>
              {activeModalCampaign.brand}
            </span>
            <p>{activeModalCampaign.description}</p>

            <div className="creator-modal__stats" style={{ margin: '20px 0' }}>
              <div>
                <strong>{activeModalCampaign.reach}</strong>
                <span>Audience Reach</span>
              </div>
              <div>
                <strong>{activeModalCampaign.engagement}</strong>
                <span>Engagement</span>
              </div>
              <div>
                <strong>{activeModalCampaign.roi}</strong>
                <span>Return on Ad Spend</span>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              <strong>Creators Involved:</strong> {activeModalCampaign.creators} verified creators<br />
              <strong>Deliverables:</strong> {activeModalCampaign.deliverables}
            </p>

            <div className="creator-modal__actions" style={{ marginTop: '24px' }}>
              <Link
                to="/contact"
                className="btn btn-primary w-full text-center"
                onClick={() => setActiveModalCampaign(null)}
              >
                Inquire About Similar Campaign &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
