import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <section className="section legal-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Last updated: January 2025</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container legal-body">
          <p>
            Arika Collabs ("we", "us", "our") respects your privacy and is committed to protecting
            the personal information you share with us as a creator or brand using our platform.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly, such as your name, email, phone number,
            Instagram handle, and campaign preferences, as well as usage data collected automatically
            when you use our website and portal.
          </p>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To match creators with relevant brand campaigns</li>
            <li>To communicate updates about your applications and collaborations</li>
            <li>To improve our platform, security, and services</li>
          </ul>

          <h2>3. Sharing Your Information</h2>
          <p>
            We only share your information with brands or creators as necessary to facilitate a
            collaboration you've opted into. We never sell your personal data to third parties.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We use industry-standard measures to protect your data. All sensitive actions are logged
            and access is restricted by cryptographic role permissions.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data at any time by
            contacting us through our{' '}
            <Link to="/contact" style={{ color: 'var(--color-signature-gold)', fontWeight: 600 }}>
              Contact page
            </Link>.
          </p>

          <h2>6. Contact Us</h2>
          <p>If you have questions about this policy, please reach out via our Contact page.</p>
        </div>
      </section>
    </div>
  );
}
