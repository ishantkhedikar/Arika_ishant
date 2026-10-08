import React, { useState } from 'react';
import { MOCK_FAQS } from '../../services/creatorService';

export default function CreatorContact() {
  const [form, setForm] = useState({
    subject: 'Opportunity Inquiry',
    campaign: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ subject: 'Opportunity Inquiry', campaign: '', message: '' });
    }, 3000);
  };

  return (
    <div className="db-content">
      <div className="db-page-header" style={{ marginBottom: '24px' }}>
        <h2>Contact Agency Team</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Direct communication channel with your dedicated Arika campaign manager.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Support Request Form */}
        <div className="db-section-card">
          <h3 style={{ marginBottom: '16px' }}>Send a Message</h3>
          {submitted ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', background: '#DCFCE7', borderRadius: '8px', color: '#16A34A' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>✓</div>
              <strong>Message sent to your campaign coordinator!</strong>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                We respond to all creator requests within standard working hours (10 AM – 7 PM IST).
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Topic / Subject
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #E5E7EB' }}
                >
                  <option value="Opportunity Inquiry">Suggest Brand Collaboration</option>
                  <option value="Brief Clarification">Campaign Brief Clarification</option>
                  <option value="Milestone & Payout">Milestone & Payout Support</option>
                  <option value="Schedule & Timeline">Deadline Extension Request</option>
                  <option value="Technical Support">Platform / Account Help</option>
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Related Campaign (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Summer Glow 2024"
                  value={form.campaign}
                  onChange={(e) => setForm({ ...form, campaign: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #E5E7EB' }}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Message Details *
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Write your note, feedback or query..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #E5E7EB' }}
                />
              </div>

              <button type="submit" className="btn btn-gold w-full cursor-pointer">
                Dispatch Note &rarr;
              </button>
            </form>
          )}
        </div>

        {/* Creator FAQ Accordion */}
        <div className="db-section-card">
          <h3 style={{ marginBottom: '16px' }}>Frequently Asked Questions</h3>
          <div className="legal-body" style={{ padding: 0 }}>
            {MOCK_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`} style={{ marginBottom: '12px' }}>
                  <button
                    type="button"
                    className="faq-question cursor-pointer"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  >
                    {faq.q} <span className="chevron">{isOpen ? '▴' : '▾'}</span>
                  </button>
                  {isOpen && <div className="faq-answer">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
