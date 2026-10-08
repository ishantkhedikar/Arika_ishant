import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      {/* ============ HERO ============ */}
      <section className="section about-hero">
        <div className="container about-hero__grid">
          <div>
            <span className="eyebrow">About Arika Collabs</span>
            <h1>
              More than influencer marketing.<br />
              <span className="text-gold">A creative partner.</span>
            </h1>
            <p>
              Arika Collabs is a modern influencer marketing agency that connects brands with
              the right Instagram creators to build authentic stories, drive engagement and deliver
              real results.
            </p>
            <div className="stat-row">
              <div>
                <strong>50+</strong>
                <span>Campaigns Delivered</span>
              </div>
              <div>
                <strong>100+</strong>
                <span>Creators Onboarded</span>
              </div>
              <div>
                <strong>15+</strong>
                <span>Brands Trust Us</span>
              </div>
            </div>
          </div>
          <div className="about-hero__visual" />
        </div>
      </section>

      {/* ============ PURPOSE ============ */}
      <section className="section section--muted">
        <div className="container purpose-grid">
          <div className="purpose-visual">AUTHENTIC CREATORS. REAL RESULTS.</div>
          <div>
            <span className="eyebrow">Our Purpose</span>
            <h2>Built on trust, creativity and impact.</h2>
            <p>
              We believe in the power of authentic content and meaningful collaborations. Our purpose is
              to bridge the gap between brands and Instagram creators, making influencer marketing simple,
              transparent and truly impactful.
            </p>
            <div className="purpose-tags">
              <span>&#129309; Authentic Connections</span>
              <span>&#128200; Long-Term Value</span>
              <span>&#10022; A More Creative Tomorrow</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="section">
        <div className="container text-center">
          <span className="eyebrow">Our Values</span>
          <h2>What drives us</h2>
          <p className="section-subtitle">Everything we do is rooted in a few simple beliefs.</p>

          <div className="grid values-grid">
            <div className="card">
              <span className="value-icon">&#128101;</span>
              <h3>People First</h3>
              <p>We value real people, real stories and genuine relationships.</p>
            </div>
            <div className="card">
              <span className="value-icon">&#128203;</span>
              <h3>Quality Over Quantity</h3>
              <p>We focus on the right collaborations, not just more collaborations.</p>
            </div>
            <div className="card">
              <span className="value-icon">&#128172;</span>
              <h3>Transparency</h3>
              <p>Clear communication, fair processes and honest expectations.</p>
            </div>
            <div className="card">
              <span className="value-icon">&#128200;</span>
              <h3>Impact Driven</h3>
              <p>We measure success by the value we create for brands and creators.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW WE WORK ============ */}
      <section className="section section--muted">
        <div className="container how-we-work">
          <div>
            <span className="eyebrow">How We Work</span>
            <h2>From vision to real results</h2>
            <p>
              We manage the entire process, so brands can focus on what matters and creators can focus
              on creating.
            </p>
            <Link to="/our-work" className="btn btn-outline">
              Learn More &rarr;
            </Link>
          </div>

          <ol className="steps-list">
            <li>
              <strong>01. Understand</strong>
              <span>We learn about the brand's goals, audience and campaign requirements.</span>
            </li>
            <li>
              <strong>02. Match</strong>
              <span>
                We find the right Instagram creators based on category, audience, language and more.
              </span>
            </li>
            <li>
              <strong>03. Manage</strong>
              <span>We handle outreach, briefs, timelines and approvals.</span>
            </li>
            <li>
              <strong>04. Create Impact</strong>
              <span>Authentic content goes live, and we track results that matter.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section">
        <div className="container cta-banner">
          <div className="cta-banner__visual">
            <span>
              A BRIGHTER TOMORROW<br />Let's build what's next
            </span>
          </div>
          <div className="cta-banner__box">
            <div>
              <strong>Interested in working with us?</strong>
              <p>Whether you're a creator or a brand, we'd love to hear from you.</p>
            </div>
            <Link to="/contact" className="btn btn-primary">
              Contact Us &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
