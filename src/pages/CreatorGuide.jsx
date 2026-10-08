import React from 'react';
import { Link } from 'react-router-dom';

export default function CreatorGuide() {
  return (
    <div className="legal-page">
      <section className="section legal-hero">
        <div className="container">
          <h1>Creator Guide</h1>
          <p>Everything you need to know to start collaborating with Arika.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container legal-body">
          <div className="guide-steps">
            <div className="guide-step">
              <span className="guide-step__number">1</span>
              <div>
                <h2 style={{ marginTop: 0 }}>Register your profile</h2>
                <p>
                  Head to{' '}
                  <Link
                    to="/login?tab=register"
                    style={{ color: 'var(--color-signature-gold)', fontWeight: 600 }}
                  >
                    Register
                  </Link>{' '}
                  and share your Instagram handle, niche, location and languages so we can match
                  you with relevant brands.
                </p>
              </div>
            </div>

            <div className="guide-step">
              <span className="guide-step__number">2</span>
              <div>
                <h2 style={{ marginTop: 0 }}>Get matched to campaigns</h2>
                <p>
                  Our team reviews your profile and invites you to campaigns that fit your audience
                  and content style. You'll see these under Collaborations in your dashboard.
                </p>
              </div>
            </div>

            <div className="guide-step">
              <span className="guide-step__number">3</span>
              <div>
                <h2 style={{ marginTop: 0 }}>Create authentic content</h2>
                <p>
                  Follow the campaign brief, but keep your own voice — brands come to Arika for
                  genuine storytelling, not scripted ads.
                </p>
              </div>
            </div>

            <div className="guide-step">
              <span className="guide-step__number">4</span>
              <div>
                <h2 style={{ marginTop: 0 }}>Submit & get paid</h2>
                <p>
                  Submit your content for approval through your dashboard. Once approved and live,
                  payment is processed per the agreed terms.
                </p>
              </div>
            </div>
          </div>

          <h2>Tips for standing out</h2>
          <ul>
            <li>Keep your profile bio and content categories up to date</li>
            <li>Respond to campaign invites promptly</li>
            <li>Deliver content by the agreed due date shown in your dashboard</li>
            <li>Maintain clear communication during revision cycles</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
