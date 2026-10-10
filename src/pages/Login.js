import React, { useState } from 'react';
import { usePark } from '../context/ParkContext';

export default function Login() {
  const { login, setCurrentPage } = usePark();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleHint, setRoleHint] = useState('driver');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter your email and password');
      return;
    }
    login(email, password, roleHint);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign In to ParkShare</h2>
        <p className="auth-sub">Enter your credentials to access your dashboard</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Login As</label>
            <div className="role-selector">
              <button
                type="button"
                className={`role-tab-btn ${roleHint === 'driver' ? 'selected' : ''}`}
                onClick={() => setRoleHint('driver')}
              >
                🚗 Driver
              </button>
              <button
                type="button"
                className={`role-tab-btn ${roleHint === 'owner' ? 'selected' : ''}`}
                onClick={() => setRoleHint('owner')}
              >
                🅿️ Owner
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label>Password</label>
              <button
                type="button"
                style={{ background: 'none', color: '#2563eb', fontSize: '0.82rem', padding: 0 }}
                onClick={() => alert('Password reset link sent to your registered email.')}
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '12px' }}>
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <button onClick={() => setCurrentPage('signup')}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
