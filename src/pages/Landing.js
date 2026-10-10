import React, { useState } from 'react';
import { usePark } from '../context/ParkContext';

export default function Landing() {
  const { login } = usePark();

  // Slide-over drawer state
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'

  // Sign In inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [roleHint, setRoleHint] = useState('driver');

  // Sign Up inputs
  const [signUpRole, setSignUpRole] = useState('driver');
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const openDrawer = (mode) => {
    setAuthMode(mode);
    setIsAuthDrawerOpen(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      alert('Please enter your email and password');
      return;
    }
    login(loginEmail, loginPassword, roleHint);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !signupEmail || !signupPassword) {
      alert('Please fill in all required fields');
      return;
    }
    login(signupEmail, signupPassword, signUpRole);
  };

  return (
    <div className="landing-lux-root">
      {/* Dynamic Ambient Mesh Glows */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Top Header Navigation */}
      <header className="landing-top-bar">
        <div className="top-logo-group">
          <div className="lux-pin-badge">P</div>
          <span className="top-brand-name">ParkShare</span>
        </div>

        <div className="top-nav-actions">
          <button className="pill-glass-btn" onClick={() => openDrawer('signin')}>
            Sign In
          </button>
          <button className="pill-solid-btn" onClick={() => openDrawer('signup')}>
            <span>Get Started</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </header>

      {/* ================= RICH TWO-COLUMN HERO SECTION ================= */}
      <main className="hero-split-grid">
        {/* Left Column: Headline, Narrative & Conversion CTAs */}
        <div className="hero-left-column">
          <div className="hero-live-chip">
            <span className="pulse-dot" />
            <span>Smart Peer Parking Network • 2,400+ Spaces Live</span>
          </div>

          <h1 className="hero-headline">
            Parking, without the <span className="gradient-span">search.</span>
          </h1>

          <p className="hero-subtext">
            Discover guaranteed private driveways, residential bays, and gated lots in high-demand urban centers.
            Reserve seamlessly in advance or monetize your unused parking space.
          </p>

          <div className="hero-actions-bar">
            <button className="hero-main-cta" onClick={() => openDrawer('signin')}>
              <span>Sign In to App</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <button className="hero-sec-cta" onClick={() => openDrawer('signup')}>
              List Your Space
            </button>
          </div>

          {/* Social Proof / Metrics */}
          <div className="hero-trust-metrics">
            <div className="metric-unit">
              <span className="metric-val">4.9 ★</span>
              <span className="metric-lbl">Driver Rating</span>
            </div>
            <div style={{ width: 1, height: 32, background: 'var(--border-subtle)' }} />
            <div className="metric-unit">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Guaranteed Bays</span>
            </div>
            <div style={{ width: 1, height: 32, background: 'var(--border-subtle)' }} />
            <div className="metric-unit">
              <span className="metric-val">₹0</span>
              <span className="metric-lbl">Search Hassle</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Smartphone Device Mockup with Floating Badges */}
        <div className="hero-right-stage">
          {/* Floating Pill Badge 1 */}
          <div className="float-card-1">
            <div className="float-icon-bubble">🅿️</div>
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0F1226' }}>Downtown Spot Reserved</div>
              <div style={{ fontSize: '0.74rem', color: '#10B981', fontWeight: 700 }}>Pass active • Bay #04</div>
            </div>
          </div>

          {/* Floating Pill Badge 2 */}
          <div className="float-card-2">
            <div className="float-icon-bubble" style={{ background: '#ECFDF5', color: '#10B981' }}>💰</div>
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0F1226' }}>+₹480 Payout Earned</div>
              <div style={{ fontSize: '0.74rem', color: '#8086A8' }}>Host automatic transfer</div>
            </div>
          </div>

          {/* 3D Smartphone Bezel Frame */}
          <div className="phone-bezel-case">
            <div className="phone-speaker-notch" />

            <div className="phone-app-screen">
              <div className="app-phone-header">
                <span>ParkShare Driver</span>
                <span style={{ color: '#10B981', fontSize: '0.75rem' }}>● Live</span>
              </div>

              <div className="app-mini-search">
                <span>🔍</span>
                <span>Financial District, San Francisco</span>
              </div>

              {/* Realistic City Vector Map Preview inside smartphone */}
              <div className="app-mini-map-deck" style={{ position: 'relative', overflow: 'hidden', background: '#EAF0F6' }}>
                {/* City Blocks & Parks */}
                <div style={{ position: 'absolute', top: 10, left: 10, width: 80, height: 50, background: '#DCE8D8', borderRadius: 8, border: '1px solid #C8DEC2' }} />
                <div style={{ position: 'absolute', top: 10, right: 15, width: 95, height: 60, background: '#DEE3EC', borderRadius: 6 }} />
                <div style={{ position: 'absolute', bottom: 12, left: 14, width: 110, height: 65, background: '#E2E6EF', borderRadius: 6 }} />
                <div style={{ position: 'absolute', bottom: 16, right: 12, width: 75, height: 55, background: '#DCE8D8', borderRadius: 8, border: '1px solid #C8DEC2' }} />

                {/* Main Avenues & Streets */}
                <div style={{ position: 'absolute', top: '48%', left: 0, right: 0, height: 26, background: '#FFFFFF', borderTop: '1px solid #CCD2DE', borderBottom: '1px solid #CCD2DE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.58rem', fontWeight: 800, color: '#9AA0AC', letterSpacing: '0.8px' }}>MARKET STREET</span>
                </div>
                <div style={{ position: 'absolute', left: '46%', top: 0, bottom: 0, width: 26, background: '#FFFFFF', borderLeft: '1px solid #CCD2DE', borderRight: '1px solid #CCD2DE' }} />

                {/* Branded Interactive Price Markers */}
                <div className="app-bubble-pin" style={{ top: '24%', left: '26%' }}>
                  ₹40/hr
                </div>
                <div className="app-bubble-pin" style={{ top: '64%', left: '58%', background: '#0D0F1D' }}>
                  ₹65/hr
                </div>
                <div className="app-bubble-pin" style={{ top: '36%', left: '72%' }}>
                  ₹50/hr
                </div>
              </div>

              {/* Sample card inside smartphone */}
              <div className="app-preview-card-item">
                <img
                  src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=300&q=80"
                  alt="Spot"
                  className="app-card-thumb"
                />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F1226' }}>Central Parking Bay</div>
                  <div style={{ fontSize: '0.7rem', color: '#8086A8' }}>0.2 km away • Covered Lot</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#5551FF', marginTop: 2 }}>₹40 / hour</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ================= BACKDROP OVERLAY ================= */}
      {isAuthDrawerOpen && (
        <div className="drawer-backdrop" onClick={() => setIsAuthDrawerOpen(false)} />
      )}

      {/* ================= SLIDE-OVER SIDEBAR DRAWER ================= */}
      <aside className={`auth-slide-drawer ${isAuthDrawerOpen ? 'drawer-open' : ''}`}>
        <div className="drawer-top-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="lux-pin-badge" style={{ width: 36, height: 36, fontSize: '1.1rem' }}>P</div>
            <span style={{ fontWeight: 800, fontSize: '1.3rem', fontFamily: 'Space Grotesk' }}>ParkShare</span>
          </div>

          <button className="drawer-exit-btn" onClick={() => setIsAuthDrawerOpen(false)}>
            ✕
          </button>
        </div>

        {/* Tab switch inside Drawer */}
        <div className="drawer-tabs-segment">
          <button
            className={`drawer-tab-switch-btn ${authMode === 'signin' ? 'active' : ''}`}
            onClick={() => setAuthMode('signin')}
          >
            Sign In
          </button>
          <button
            className={`drawer-tab-switch-btn ${authMode === 'signup' ? 'active' : ''}`}
            onClick={() => setAuthMode('signup')}
          >
            Create Account
          </button>
        </div>

        {/* ================= SIGN IN TAB ================= */}
        {authMode === 'signin' && (
          <form onSubmit={handleLoginSubmit}>
            <h2 className="drawer-title-heading">Welcome back</h2>
            <p className="drawer-sub-heading">Sign in with your email to access your spaces.</p>

            <div className="input-group">
              <label className="input-label">Select Experience</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button
                  type="button"
                  className={`role-chip-toggle ${roleHint === 'driver' ? 'selected' : ''}`}
                  onClick={() => setRoleHint('driver')}
                >
                  🚗 Driver
                </button>
                <button
                  type="button"
                  className={`role-chip-toggle ${roleHint === 'owner' ? 'selected' : ''}`}
                  onClick={() => setRoleHint('owner')}
                >
                  🅿️ Space Owner
                </button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Email address</label>
              <input
                type="email"
                className="input-control"
                placeholder="name@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <div className="input-label-row">
                <label className="input-label">Password</label>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => alert('Password reset instructions sent to your email.')}
                >
                  Forgot?
                </button>
              </div>
              <div className="text-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-control"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary-action" style={{ marginTop: 14 }}>
              Sign In to Dashboard →
            </button>

            <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              New to ParkShare?{' '}
              <button
                type="button"
                className="link-btn"
                style={{ fontWeight: 700 }}
                onClick={() => setAuthMode('signup')}
              >
                Create an account
              </button>
            </div>
          </form>
        )}

        {/* ================= SIGN UP TAB ================= */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignupSubmit}>
            <h2 className="drawer-title-heading">Join ParkShare</h2>
            <p className="drawer-sub-heading">Choose your account type and get started in seconds.</p>

            <div className="input-group">
              <label className="input-label">I want to register as</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button
                  type="button"
                  className={`role-chip-toggle ${signUpRole === 'driver' ? 'selected' : ''}`}
                  onClick={() => setSignUpRole('driver')}
                >
                  🚗 Driver
                </button>
                <button
                  type="button"
                  className={`role-chip-toggle ${signUpRole === 'owner' ? 'selected' : ''}`}
                  onClick={() => setSignUpRole('owner')}
                >
                  🅿️ Space Owner
                </button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                className="input-control"
                placeholder="e.g. Alex Mercer"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                className="input-control"
                placeholder="you@domain.com"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Phone Number</label>
              <input
                type="tel"
                className="input-control"
                placeholder="+91 98765 43210"
                value={signupPhone}
                onChange={(e) => setSignupPhone(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Create Password</label>
              <input
                type="password"
                className="input-control"
                placeholder="Choose a strong password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary-action" style={{ marginTop: 14 }}>
              Create Account as {signUpRole === 'driver' ? 'Driver' : 'Owner'}
            </button>

            <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Already registered?{' '}
              <button
                type="button"
                className="link-btn"
                style={{ fontWeight: 700 }}
                onClick={() => setAuthMode('signin')}
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </aside>
    </div>
  );
}
