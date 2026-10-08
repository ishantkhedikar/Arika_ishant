import React, { useState } from 'react';
import { creatorService } from '../../services/creatorService';

export default function CreatorProfile() {
  const [profile, setProfile] = useState(() => creatorService.getProfile());
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const toggleCategory = (cat) => {
    setProfile((prev) => {
      const exists = prev.categories.includes(cat);
      const next = exists ? prev.categories.filter((c) => c !== cat) : [...prev.categories, cat];
      return { ...prev, categories: next };
    });
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    creatorService.saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const allCategories = ['Fashion', 'Beauty', 'Lifestyle', 'Fitness', 'Travel', 'Food', 'Tech'];

  return (
    <div className="db-content">
      <div className="db-page-header" style={{ marginBottom: '24px' }}>
        <h2>Creator Profile & Media Kit</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Keep your niches, audience metrics, and contact information up-to-date for brand matching.
        </p>
      </div>

      <div className="db-section-card" style={{ maxWidth: '800px' }}>
        {saved && (
          <div
            style={{
              background: '#DCFCE7',
              color: '#16A34A',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontWeight: 500
            }}
          >
            ✓ Profile changes saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="two-col-form">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', gridColumn: 'span 2', marginBottom: '16px' }}>
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-signature-gold)' }}
            />
            <div>
              <h3 style={{ margin: 0 }}>{profile.fullName}</h3>
              <span style={{ color: 'var(--color-signature-gold)', fontWeight: 600 }}>{profile.instagramHandle}</span>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Status: Verified Creator &middot; Profile Completion: {profile.profileCompletion}%
              </p>
            </div>
          </div>

          <div>
            <label>First Name</label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              required
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              required
            />
          </div>

          <div>
            <label>Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          <div>
            <label>Instagram Handle</label>
            <input
              type="text"
              value={profile.instagramHandle}
              onChange={(e) => handleChange('instagramHandle', e.target.value)}
              required
            />
          </div>

          <div>
            <label>Location / City</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>

          <div>
            <label>Follower Tier</label>
            <select
              value={profile.followerRange}
              onChange={(e) => handleChange('followerRange', e.target.value)}
            >
              <option value="10k–50k">10k – 50k</option>
              <option value="50k–100k">50k – 100k</option>
              <option value="100k–250k">100k – 250k</option>
              <option value="250k+">250k+ Tier 1</option>
            </select>
          </div>

          <div>
            <label>Avg. Engagement Rate</label>
            <input
              type="text"
              value={profile.engagementRange}
              onChange={(e) => handleChange('engagementRange', e.target.value)}
            />
          </div>

          <div className="span-2">
            <label>Creator Bio</label>
            <textarea
              rows="3"
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
            />
          </div>

          <div className="span-2">
            <label style={{ marginBottom: '8px', display: 'block' }}>Primary Content Niches</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {allCategories.map((cat) => {
                const isSelected = profile.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`btn cursor-pointer ${isSelected ? 'btn-gold' : 'btn-outline'}`}
                    style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                    onClick={() => toggleCategory(cat)}
                  >
                    {cat} {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="span-2">
            <label style={{ marginBottom: '8px', display: 'block' }}>Availability Status</label>
            <select
              value={profile.availability}
              onChange={(e) => handleChange('availability', e.target.value)}
            >
              <option value="available">Available for New Campaigns</option>
              <option value="limited">Limited Capacity (Next 2 Weeks)</option>
              <option value="busy">Currently Fully Booked</option>
            </select>
          </div>

          <div className="span-2" style={{ marginTop: '16px' }}>
            <button type="submit" className="btn btn-primary cursor-pointer">
              Save Profile Changes &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
