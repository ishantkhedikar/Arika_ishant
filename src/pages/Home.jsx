import React from 'react';
import { Link } from 'react-router-dom';
import CreatorCollage from '../components/CreatorCollage';

export default function Home() {
  return (
    <div className="home-page">
      {/* ============ 1. HERO SECTION ============ */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <span className="eyebrow">Influencer Marketing Agency</span>
            <h1>
              We handle the deals, <span className="text-gold">you shine.</span>
            </h1>
            <p>
              Arika Collabs connects brands with the right Instagram creators to create
              authentic content, drive engagement and deliver real results.
            </p>
            <div className="hero__actions">
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/login?tab=register" className="btn btn-primary">
                Register &rarr;
              </Link>
            </div>
          </div>

          <CreatorCollage />
        </div>
      </section>

      {/* ============ 2. STATS SECTION ============ */}
      <section className="section stats-section">
        <div className="container">
          <div className="hero__stats-bar">
            <div className="stat-item">
              <strong className="stat-number">50+</strong>
              <span className="stat-label">Campaigns Delivered</span>
            </div>
            <div className="stat-item">
              <strong className="stat-number">100+</strong>
              <span className="stat-label">Creators Onboarded</span>
            </div>
            <div className="stat-item">
              <strong className="stat-number">15+</strong>
              <span className="stat-label">Brands Trust Us</span>
            </div>
            <div className="stat-item">
              <strong className="stat-number">98%</strong>
              <span className="stat-label">Campaign Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. WHAT WE DO ============ */}
      <section className="section section--muted what-we-do-section">
        <div className="container text-center">
          <span className="eyebrow">What We Do</span>
          <h2>
            End-to-end influencer marketing, <span className="text-gold">made simple.</span>
          </h2>
          <p className="section-subtitle">
            From strategy to execution, we manage everything so brands can focus on what
            matters and creators can focus on creating.
          </p>

          <div className="grid feature-grid">
            <div className="card feature-card">
              <h3>Strategic Matching</h3>
              <p>We connect brands with the right Instagram creators based on goals, audience and values.</p>
            </div>
            <div className="card feature-card">
              <h3>Campaign Management</h3>
              <p>We handle the entire process from planning to execution and delivery.</p>
            </div>
            <div className="card feature-card">
              <h3>Content & Quality</h3>
              <p>We ensure authentic, high-quality content that tells your brand's story.</p>
            </div>
            <div className="card feature-card">
              <h3>Real Results</h3>
              <p>We track performance and deliver insights that create long-term value.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. ABOUT PREVIEW ============ */}
      <section className="section about-section">
        <div className="container about-preview">
          <div className="about-preview__image" />
          <div className="about-preview__content">
            <span className="eyebrow">About Arika Collabs</span>
            <h2>A modern approach to influencer marketing.</h2>
            <p>
              We are a passionate team that bridges the gap between brands and Instagram creators.
              Our focus is on meaningful collaborations, authentic storytelling and measurable impact.
            </p>
            <div className="about-preview__points">
              <div className="about-point">
                <span className="about-point__icon">&#10003;</span>
                <span>Authentic Storytelling & Content</span>
              </div>
              <div className="about-point">
                <span className="about-point__icon">&#10003;</span>
                <span>Data-Driven Creator Matchmaking</span>
              </div>
              <div className="about-point">
                <span className="about-point__icon">&#10003;</span>
                <span>End-to-End Campaign Delivery</span>
              </div>
            </div>
            <Link to="/about" className="btn btn-outline">
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 5. OUR WORK PREVIEW ============ */}
      <section className="section section--muted our-work-section">
        <div className="container">
          <div className="flex-between our-work-header">
            <div>
              <span className="eyebrow">Our Work</span>
              <h2>
                Real brands. <span className="text-gold">Real impact.</span>
              </h2>
              <p style={{ maxWidth: '520px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                From product launches to brand awareness, explore our featured creator partnerships and campaign results.
              </p>
            </div>
            <Link to="/our-work" className="btn btn-outline">
              Explore All Work &rarr;
            </Link>
          </div>

          <div className="grid campaign-grid-home">
            <Link to="/our-work" className="card campaign-card-preview">
              <span className="campaign-tag">Beauty</span>
              <div
                className="campaign-thumb-preview"
                style={{ backgroundImage: "url('/assets/images/campaign-beauty.svg')" }}
              />
              <h3>Glow Ritual Series</h3>
              <span className="campaign-brand">AURÉA</span>
              <p>A creator-led campaign to launch a new skincare range, focusing on real routines and visible results.</p>
              <div className="campaign-stats-preview">
                <span><strong>1.2M</strong> Reach</span>
                <span><strong>4.8%</strong> Engagement</span>
              </div>
            </Link>

            <Link to="/our-work" className="card campaign-card-preview">
              <span className="campaign-tag">Fashion</span>
              <div
                className="campaign-thumb-preview"
                style={{ backgroundImage: "url('/assets/images/campaign-fashion.svg')" }}
              />
              <h3>Urban Motion Capsule</h3>
              <span className="campaign-brand">VELOCE</span>
              <p>Streetwear meets movement — an editorial campaign showcasing everyday mobility and style.</p>
              <div className="campaign-stats-preview">
                <span><strong>850K</strong> Reach</span>
                <span><strong>5.2%</strong> Engagement</span>
              </div>
            </Link>

            <Link to="/our-work" className="card campaign-card-preview">
              <span className="campaign-tag">Lifestyle</span>
              <div
                className="campaign-thumb-preview"
                style={{ backgroundImage: "url('/assets/images/campaign-lifestyle.svg')" }}
              />
              <h3>Heritage Botanicals</h3>
              <span className="campaign-brand">TERRA</span>
              <p>Bringing natural home living to life through authentic creator spaces and mindful living moments.</p>
              <div className="campaign-stats-preview">
                <span><strong>640K</strong> Reach</span>
                <span><strong>6.1%</strong> Engagement</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 6. INSTAGRAM PREVIEW ============ */}
      <section className="section instagram-section">
        <div className="container">
          <div className="flex-between">
            <div>
              <span className="eyebrow">On Instagram</span>
              <h2>
                Real collaborations. <span className="text-gold">Real stories.</span>
              </h2>
            </div>
            <Link to="/instagram" className="btn btn-outline">
              Visit Instagram &nearr;
            </Link>
          </div>

          <div className="grid instagram-strip">
            <div className="ig-tile" style={{ backgroundImage: "url('/assets/images/ig-tile-1.svg')" }} />
            <div className="ig-tile" style={{ backgroundImage: "url('/assets/images/ig-tile-2.svg')" }} />
            <div className="ig-tile" style={{ backgroundImage: "url('/assets/images/ig-tile-3.svg')" }} />
            <div className="ig-tile" style={{ backgroundImage: "url('/assets/images/ig-tile-4.svg')" }} />
            <div className="ig-tile" style={{ backgroundImage: "url('/assets/images/ig-tile-5.svg')" }} />
            <div className="ig-tile" style={{ backgroundImage: "url('/assets/images/ig-tile-6.svg')" }} />
          </div>
        </div>
      </section>

      {/* ============ 7. CONTACT PREVIEW ============ */}
      <section className="section section--muted contact-home-section">
        <div className="container">
          <div className="contact-home-card">
            <div className="contact-home-content">
              <span className="eyebrow">Get in Touch</span>
              <h2>Let's create what's <span className="text-gold">next.</span></h2>
              <p>
                Whether you're a creator ready for new brand deals or a brand looking to launch
                impactful creator campaigns, we'd love to collaborate with you.
              </p>
              <div className="contact-home-actions">
                <Link to="/login?tab=register" className="btn btn-gold">
                  Apply as Creator &rarr;
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Brand Partnership Inquiry
                </Link>
              </div>
            </div>
            <div className="contact-home-badges">
              <div className="contact-info-pill">
                <strong>Email Us</strong>
                <span>hello@arikacollabs.com</span>
              </div>
              <div className="contact-info-pill">
                <strong>Location</strong>
                <span>Mumbai &amp; Delhi, India</span>
              </div>
              <div className="contact-info-pill">
                <strong>Response Time</strong>
                <span>Within 24 business hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
