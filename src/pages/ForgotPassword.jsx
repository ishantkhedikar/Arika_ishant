import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-panel">
          <Link to="/" className="logo">
            ARIKA <span>COLLABS</span>
          </Link>

          <div className="auth-card">
            <form className="auth-form active" onSubmit={handleSubmit}>
              <h2>Reset your password</h2>
              <p className="auth-subtitle">
                Enter your email address and we'll send you a password reset link.
              </p>

              {sent && (
                <div
                  className="auth-alert visible"
                  style={{
                    background: '#DCFCE7',
                    color: '#16A34A',
                    padding: '12px 14px',
                    borderRadius: '6px',
                    marginBottom: '16px'
                  }}
                >
                  If <strong>{email}</strong> is registered, a password reset link has been dispatched!
                </div>
              )}

              <label htmlFor="fp-email">Email address</label>
              <input
                type="email"
                id="fp-email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button type="submit" className="btn btn-gold btn-full cursor-pointer">
                Send Reset Link &rarr;
              </button>

              <p className="auth-switch">
                Remembered your password? <Link to="/login">Back to Login</Link>
              </p>
            </form>
          </div>
        </div>

        <div className="auth-visual">
          <div className="auth-visual__overlay">
            <h3>
              CREATE<br />
              COLLABORATE<br />
              GROW
            </h3>
            <p>A brighter tomorrow together.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
