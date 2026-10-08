import React, { useState } from 'react';

export default function Contact() {
  const [activeTab, setActiveTab] = useState('creator');
  const [submitted, setSubmitted] = useState(false);

  // Controlled Creator form
  const [creatorForm, setCreatorForm] = useState({
    name: '',
    insta: '',
    email: '',
    phone: '',
    category: '',
    location: '',
    lang: '',
    message: ''
  });

  // Controlled Brand form
  const [brandForm, setBrandForm] = useState({
    brand: '',
    name: '',
    email: '',
    phone: '',
    website: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const handleCreatorSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setCreatorForm({
        name: '',
        insta: '',
        email: '',
        phone: '',
        category: '',
        location: '',
        lang: '',
        message: ''
      });
    }, 500);
  };

  const handleBrandSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setBrandForm({
        brand: '',
        name: '',
        email: '',
        phone: '',
        website: '',
        budget: '',
        timeline: '',
        message: ''
      });
    }, 500);
  };

  return (
    <div className="contact-page">
      {/* ============ INTRO ============ */}
      <section className="section contact-intro">
        <div className="container contact-intro__grid">
          <div>
            <span className="eyebrow">Get in Touch</span>
            <h1>
              Let's create what's <span className="text-gold">next.</span>
            </h1>
            <p>
              Whether you're a creator ready for new opportunities or a brand looking to
              collaborate, we'd love to hear from you. Tell us a bit about yourself and our
              team will get back to you soon.
            </p>
          </div>
          <div className="contact-intro__visual">
            <div className="contact-intro__overlay">
              <h3>
                CREATORS TURN<br />
                PASSION INTO<br />
                OPPORTUNITY.
              </h3>
              <p>A brighter tomorrow together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHO ARE YOU TOGGLE ============ */}
      <section className="section who-are-you">
        <div className="container text-center">
          <span className="eyebrow">Who Are You?</span>
          <h2>Tell us a little more so we can help you better.</h2>

          <div className="toggle-group">
            <button
              type="button"
              className={`toggle-btn cursor-pointer ${activeTab === 'creator' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('creator');
                setSubmitted(false);
              }}
            >
              &#128101; I'm a Creator
            </button>
            <button
              type="button"
              className={`toggle-btn cursor-pointer ${activeTab === 'brand' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('brand');
                setSubmitted(false);
              }}
            >
              &#127970; I'm a Brand
            </button>
          </div>
        </div>
      </section>

      {/* ============ FORMS ============ */}
      <section className="section section--muted">
        <div className="container">
          {submitted ? (
            <div
              className="card text-center"
              style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '48px 32px',
                background: '#FFFFFF'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  color: '#16A34A',
                  fontSize: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}
              >
                ✓
              </div>
              <h3>Thank you for reaching out!</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>
                Your message has been received. Our team will review your details and respond within
                1–2 business days.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginTop: '24px' }}
                onClick={() => setSubmitted(false)}
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <>
              {/* CREATOR FORM */}
              {activeTab === 'creator' && (
                <div className="form-panel active" id="form-creator">
                  <div className="form-panel__visual">
                    <span>MORE THAN JUST CAMPAIGNS.</span>
                  </div>
                  <div className="form-panel__body">
                    <span className="eyebrow">For Creators</span>
                    <h3>Ready to collaborate with Arika?</h3>
                    <p>Share a few details about yourself and our team will review your profile.</p>

                    <form className="two-col-form" onSubmit={handleCreatorSubmit}>
                      <div>
                        <label htmlFor="c-name">Full Name *</label>
                        <input
                          type="text"
                          id="c-name"
                          value={creatorForm.name}
                          onChange={(e) => setCreatorForm({ ...creatorForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="c-insta">Instagram Username *</label>
                        <input
                          type="text"
                          id="c-insta"
                          placeholder="@username"
                          value={creatorForm.insta}
                          onChange={(e) => setCreatorForm({ ...creatorForm, insta: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="c-email">Email Address *</label>
                        <input
                          type="email"
                          id="c-email"
                          value={creatorForm.email}
                          onChange={(e) => setCreatorForm({ ...creatorForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="c-phone">Phone Number *</label>
                        <input
                          type="tel"
                          id="c-phone"
                          value={creatorForm.phone}
                          onChange={(e) => setCreatorForm({ ...creatorForm, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="c-category">Category / Niche *</label>
                        <select
                          id="c-category"
                          value={creatorForm.category}
                          onChange={(e) =>
                            setCreatorForm({ ...creatorForm, category: e.target.value })
                          }
                          required
                        >
                          <option value="">Select category</option>
                          <option>Beauty</option>
                          <option>Fashion</option>
                          <option>Lifestyle</option>
                          <option>Tech</option>
                          <option>Fragrance</option>
                          <option>Skincare</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="c-location">Location (City) *</label>
                        <input
                          type="text"
                          id="c-location"
                          value={creatorForm.location}
                          onChange={(e) =>
                            setCreatorForm({ ...creatorForm, location: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="span-2">
                        <label htmlFor="c-lang">Preferred Language(s) *</label>
                        <input
                          type="text"
                          id="c-lang"
                          value={creatorForm.lang}
                          onChange={(e) => setCreatorForm({ ...creatorForm, lang: e.target.value })}
                          required
                        />
                      </div>
                      <div className="span-2">
                        <label htmlFor="c-message">
                          Tell us more about yourself, your content and goals *
                        </label>
                        <textarea
                          id="c-message"
                          rows="4"
                          value={creatorForm.message}
                          onChange={(e) =>
                            setCreatorForm({ ...creatorForm, message: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="span-2">
                        <button type="submit" className="btn btn-primary cursor-pointer">
                          Submit Application &rarr;
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* BRAND FORM */}
              {activeTab === 'brand' && (
                <div className="form-panel active" id="form-brand">
                  <div className="form-panel__visual form-panel__visual--brand">
                    <span>IDEAS PEOPLE BRANDS IMPACT</span>
                  </div>
                  <div className="form-panel__body">
                    <span className="eyebrow">For Brands</span>
                    <h3>Let's talk about your brand.</h3>
                    <p>Share your requirements and our team will get in touch to discuss collaboration.</p>

                    <form className="two-col-form" onSubmit={handleBrandSubmit}>
                      <div>
                        <label htmlFor="b-brand">Brand Name *</label>
                        <input
                          type="text"
                          id="b-brand"
                          value={brandForm.brand}
                          onChange={(e) => setBrandForm({ ...brandForm, brand: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="b-name">Your Name *</label>
                        <input
                          type="text"
                          id="b-name"
                          value={brandForm.name}
                          onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="b-email">Work Email *</label>
                        <input
                          type="email"
                          id="b-email"
                          value={brandForm.email}
                          onChange={(e) => setBrandForm({ ...brandForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="b-phone">Phone Number *</label>
                        <input
                          type="tel"
                          id="b-phone"
                          value={brandForm.phone}
                          onChange={(e) => setBrandForm({ ...brandForm, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="b-web">Website or Instagram Handle</label>
                        <input
                          type="text"
                          id="b-web"
                          value={brandForm.website}
                          onChange={(e) => setBrandForm({ ...brandForm, website: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="b-budget">Estimated Budget</label>
                        <select
                          id="b-budget"
                          value={brandForm.budget}
                          onChange={(e) => setBrandForm({ ...brandForm, budget: e.target.value })}
                        >
                          <option value="">Select budget range</option>
                          <option>Under ₹1,00,000</option>
                          <option>₹1,00,000 – ₹3,00,000</option>
                          <option>₹3,00,000 – ₹7,00,000</option>
                          <option>₹7,00,000+</option>
                        </select>
                      </div>
                      <div className="span-2">
                        <label htmlFor="b-timeline">Campaign Timeline</label>
                        <input
                          type="text"
                          id="b-timeline"
                          placeholder="e.g. Next month, Q4 festive season"
                          value={brandForm.timeline}
                          onChange={(e) =>
                            setBrandForm({ ...brandForm, timeline: e.target.value })
                          }
                        />
                      </div>
                      <div className="span-2">
                        <label htmlFor="b-message">What are your campaign goals? *</label>
                        <textarea
                          id="b-message"
                          rows="4"
                          value={brandForm.message}
                          onChange={(e) =>
                            setBrandForm({ ...brandForm, message: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="span-2">
                        <button type="submit" className="btn btn-primary cursor-pointer">
                          Send Proposal &rarr;
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
