import React from 'react';
import { usePark } from '../context/ParkContext';

export default function Navbar() {
  const { currentPage, setCurrentPage, currentUser, logout } = usePark();

  // If on the split-screen landing page, the brand logo and sign-in are already embedded seamlessly
  if (currentPage === 'landing') {
    return null;
  }

  const isDriver = currentUser?.role === 'driver';
  const isOwner = currentUser?.role === 'owner';

  return (
    <header className="brand-nav">
      <div
        className="brand-nav-logo"
        onClick={() => {
          if (!currentUser) setCurrentPage('landing');
          else if (isDriver) setCurrentPage('driver-dashboard');
          else setCurrentPage('owner-dashboard');
        }}
      >
        <div className="pin-icon">P</div>
        <span className="wordmark">ParkShare</span>
      </div>

      <nav className="brand-nav-links">
        {currentUser ? (
          <>
            {isDriver && (
              <>
                <button
                  className={`nav-pill-btn ${currentPage === 'driver-dashboard' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('driver-dashboard')}
                >
                  <span>🔍</span> Find Parking
                </button>
                <button
                  className={`nav-pill-btn ${currentPage === 'my-bookings' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('my-bookings')}
                >
                  <span>🎫</span> My Bookings
                </button>
              </>
            )}

            {isOwner && (
              <>
                <button
                  className={`nav-pill-btn ${currentPage === 'owner-dashboard' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('owner-dashboard')}
                >
                  <span>📊</span> Overview
                </button>
                <button
                  className={`nav-pill-btn ${currentPage === 'add-parking' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('add-parking')}
                >
                  <span>➕</span> Add Space
                </button>
                <button
                  className={`nav-pill-btn ${currentPage === 'owner-bookings' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('owner-bookings')}
                >
                  <span>📬</span> Bookings
                </button>
              </>
            )}

            {/* User profile capsule */}
            <div className="user-badge-chip">
              <div className="user-avatar-bubble">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#12142B' }}>
                {currentUser.name?.split(' ')[0]}
              </span>
              <span className={`user-role-badge ${currentUser.role}`}>
                {currentUser.role}
              </span>
            </div>

            <button
              className="nav-pill-btn"
              style={{ color: '#EF4444' }}
              onClick={logout}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button
              className="btn-outline-action"
              style={{ height: 42, padding: '0 20px' }}
              onClick={() => setCurrentPage('landing')}
            >
              Sign In
            </button>
            <button
              className="btn-primary-action"
              style={{ height: 42, padding: '0 20px', width: 'auto' }}
              onClick={() => setCurrentPage('signup')}
            >
              Create Account
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
