import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="logo">
              ARIKA <span>COLLABS</span>
            </Link>
            <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Connecting brands and creators to build a brighter tomorrow.
            </p>
          </div>

          <div>
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/our-work">Our Work</Link></li>
              <li><Link to="/instagram">Instagram</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>For Creators</h4>
            <ul>
              <li><Link to="/login?tab=register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/creator-guide">Creator Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use">Terms of Use</Link></li>
            </ul>
          </div>

          <div>
            <h4>Follow</h4>
            <div className="footer-social">
              <a href="https://instagram.com/arikacollabs" target="_blank" rel="noreferrer" aria-label="Instagram">
                IG
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                in
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                YT
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Arika Collabs. All rights reserved.</span>
          <span>Built for a more creative tomorrow.</span>
        </div>
      </div>
    </footer>
  );
}
