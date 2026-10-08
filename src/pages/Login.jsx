import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState('login');
  const [role, setRole] = useState('user');
  const [identifier, setIdentifier] = useState('user@arikacollabs.com');
  const [password, setPassword] = useState('user123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  useEffect(() => {
    if (searchParams.get('tab') === 'register' || window.location.hash === '#register') {
      setActiveTab('register');
    }
    if (searchParams.get('error') === 'unauthorized') {
      setError('Access denied: Please log in with valid admin credentials.');
      setRole('admin');
      setIdentifier('admin@arikacollabs.com');
      setPassword('admin123');
    } else if (searchParams.get('role') === 'admin') {
      setRole('admin');
      setIdentifier('admin@arikacollabs.com');
      setPassword('admin123');
    }
  }, [searchParams]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setError('');
    if (newRole === 'admin') {
      setIdentifier('admin@arikacollabs.com');
      setPassword('admin123');
    } else {
      setIdentifier('user@arikacollabs.com');
      setPassword('user123');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!identifier || !password) {
      setError('Please enter your email/username and password.');
      return;
    }

    const res = login(identifier, password, role, rememberMe);
    if (res.success) {
      if (res.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/creator/dashboard');
      }
    } else {
      setError(res.error || 'Invalid credentials.');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterSuccess('Registration submitted! For testing, you can log in with demo accounts.');
    setTimeout(() => {
      setActiveTab('login');
      setRegisterSuccess('');
    }, 2000);
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        {/* LEFT PANEL */}
        <div className="auth-panel">
          <Link to="/" className="logo">
            ARIKA <span>COLLABS</span>
          </Link>

          <div className="auth-card">
            {/* Tabs */}
            <div className="auth-tabs">
              <button
                type="button"
                className={`auth-tab cursor-pointer ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('login');
                  setError('');
                }}
              >
                Login
              </button>
              <button
                type="button"
                className={`auth-tab cursor-pointer ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('register');
                  setError('');
                }}
              >
                Register
              </button>
            </div>

            {/* LOGIN FORM */}
            {activeTab === 'login' && (
              <form className="auth-form active" onSubmit={handleLoginSubmit}>
                <h2>
                  {role === 'admin' ? 'Welcome back, Admin' : 'Welcome back, Creator'}
                </h2>
                <p className="auth-subtitle">
                  {role === 'admin'
                    ? 'Log in to access the Private Admin Portal.'
                    : 'Log in to access your dashboard.'}
                </p>

                {error && (
                  <div className="auth-alert auth-alert--error visible" role="alert">
                    <span className="auth-alert__icon">&#9888;</span>
                    <span className="auth-alert__text">{error}</span>
                  </div>
                )}

                {/* Account Type Selector */}
                <div className="account-type-group">
                  <label>Account Type</label>
                  <div className="account-type-selector" role="radiogroup">
                    <button
                      type="button"
                      className={`account-type-btn cursor-pointer ${role === 'user' ? 'active' : ''}`}
                      onClick={() => handleRoleChange('user')}
                    >
                      <span>&#128100; User</span>
                    </button>
                    <button
                      type="button"
                      className={`account-type-btn cursor-pointer ${role === 'admin' ? 'active' : ''}`}
                      onClick={() => handleRoleChange('admin')}
                    >
                      <span>&#128737; Admin</span>
                    </button>
                  </div>
                </div>

                <label htmlFor="login-email">Email address or Username</label>
                <input
                  type="text"
                  id="login-email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="you@example.com or username"
                  autoComplete="username"
                  required
                />

                <label htmlFor="login-password">Password</label>
                <div className="input-with-icon">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password"
                  >
                    &#128065;
                  </button>
                </div>

                <div className="auth-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ width: 'auto' }}
                    />
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="link-muted">
                    Forgot password?
                  </Link>
                </div>

                <button type="submit" className="btn btn-gold btn-full cursor-pointer">
                  Login &rarr;
                </button>

                {/* Demo Accounts Helper */}
                <div className="demo-credentials-card">
                  <div><strong>Development Demo Accounts:</strong></div>
                  <div style={{ marginTop: '4px' }}>
                    • <strong>Admin:</strong> <code>admin@arikacollabs.com</code> / <code>admin123</code>
                  </div>
                  <div>
                    • <strong>User:</strong> <code>user@arikacollabs.com</code> / <code>user123</code>
                  </div>
                </div>

                <div className="auth-divider">
                  <span>OR</span>
                </div>

                <button
                  type="button"
                  className="btn btn-outline btn-full cursor-pointer"
                  onClick={() => alert('Social sign-in: for testing, please use the provided demo accounts.')}
                >
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-full cursor-pointer"
                  onClick={() => alert('Social sign-in: for testing, please use the provided demo accounts.')}
                >
                  Continue with Instagram
                </button>

                <p className="auth-switch">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="cursor-pointer"
                    style={{ background: 'none', border: 'none', color: 'var(--color-signature-gold)', fontWeight: 600 }}
                    onClick={() => setActiveTab('register')}
                  >
                    Register here
                  </button>
                </p>
              </form>
            )}

            {/* REGISTER FORM */}
            {activeTab === 'register' && (
              <form className="auth-form active" onSubmit={handleRegisterSubmit}>
                <h2>Join Arika Collabs</h2>
                <p className="auth-subtitle">Create your creator account to get started.</p>

                {registerSuccess && (
                  <div className="auth-alert auth-alert--success visible" style={{ background: '#DCFCE7', color: '#16A34A', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px' }}>
                    <span>{registerSuccess}</span>
                  </div>
                )}

                <label htmlFor="reg-name">Full Name</label>
                <input
                  type="text"
                  id="reg-name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Your full name"
                  required
                />

                <label htmlFor="reg-email">Email address</label>
                <input
                  type="email"
                  id="reg-email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />

                <label htmlFor="reg-password">Password</label>
                <input
                  type="password"
                  id="reg-password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />

                <button type="submit" className="btn btn-gold btn-full cursor-pointer">
                  Register &rarr;
                </button>

                <p className="auth-switch">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="cursor-pointer"
                    style={{ background: 'none', border: 'none', color: 'var(--color-signature-gold)', fontWeight: 600 }}
                    onClick={() => setActiveTab('login')}
                  >
                    Login here
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
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
