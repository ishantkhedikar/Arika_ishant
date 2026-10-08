import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'How do I apply as a creator?',
    a: 'Go to Register on the homepage, fill in your details including your Instagram handle and niche, and submit. Our team reviews applications within 1–2 business days.'
  },
  {
    q: 'How long until I hear back after applying?',
    a: 'We typically respond within 1–2 business days, as noted on our Contact page.'
  },
  {
    q: 'How do I check the status of a collaboration?',
    a: 'Log in to your Creator Dashboard and open the Collaborations tab — every campaign shows its current status (In Progress, Under Review, or Completed).'
  },
  {
    q: "I'm a brand — how do I start a campaign?",
    a: 'Visit our Contact page, select "I\'m a Brand," and share your campaign goals. Our team will follow up to discuss creator matches.'
  },
  {
    q: 'I forgot my password. What do I do?',
    a: 'On the Login page, click "Forgot password?" and follow the steps to reset it.'
  }
];

export default function Support() {
  const [openIndexes, setOpenIndexes] = useState([0]);

  const toggleFaq = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="legal-page">
      <section className="section legal-hero">
        <div className="container">
          <h1>Support</h1>
          <p>
            Answers to common questions. Still stuck?{' '}
            <Link to="/contact" style={{ color: 'var(--color-signature-gold)', fontWeight: 600 }}>
              Contact us
            </Link>.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container legal-body">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndexes.includes(idx);
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question cursor-pointer"
                  onClick={() => toggleFaq(idx)}
                >
                  {faq.q} <span className="chevron">{isOpen ? '▴' : '▾'}</span>
                </button>
                {isOpen && <div className="faq-answer">{faq.a}</div>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
