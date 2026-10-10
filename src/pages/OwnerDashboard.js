import React from 'react';
import { usePark } from '../context/ParkContext';

export default function OwnerDashboard() {
  const { spots, bookings, toggleSpotAvailability, setCurrentPage, currentUser } = usePark();

  // Metrics
  const totalListings = spots.length;
  const activeCount = spots.filter((s) => s.isAvailable).length;
  const pausedCount = totalListings - activeCount;
  const totalEarningsINR = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0) * 4;

  return (
    <div className="dashboard-shell">
      {/* Sidebar for Owner */}
      <aside className="dashboard-sidebar">
        <div>
          <div className="sidebar-section-heading">Host Console</div>
          <div className="sidebar-menu-group">
            <button className="sidebar-link-btn active">
              <span className="btn-icon">📊</span> Overview & Spaces
            </button>
            <button
              className="sidebar-link-btn"
              onClick={() => setCurrentPage('add-parking')}
            >
              <span className="btn-icon">➕</span> Add New Space
            </button>
            <button
              className="sidebar-link-btn"
              onClick={() => setCurrentPage('owner-bookings')}
            >
              <span className="btn-icon">📬</span> Incoming Bookings
            </button>
          </div>

          <div className="sidebar-section-heading" style={{ marginTop: 24 }}>Earnings & Payouts</div>
          <div className="sidebar-menu-group">
            <button
              className="sidebar-link-btn"
              onClick={() => setCurrentPage('payout-settings')}
            >
              <span className="btn-icon">💰</span> Payout Settings
            </button>
            <button
              className="sidebar-link-btn"
              onClick={() => setCurrentPage('monthly-reports')}
            >
              <span className="btn-icon">📄</span> Monthly Reports
            </button>
          </div>
        </div>

        <div style={{ background: '#F1F2FD', padding: 16, borderRadius: 12, border: '1px solid #E5E7F2' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#5255EB', marginBottom: 4 }}>
            Host Protection Guarantee
          </div>
          <div style={{ fontSize: '0.78rem', color: '#757999' }}>
            All parked vehicles are verified and insured up to ₹5,00,000.
          </div>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="dashboard-main-viewport">
        <div className="dash-topbar">
          <div>
            <h1 className="dash-welcome-title">
              Host Dashboard: {currentUser?.name || 'Marcus Vance'}
            </h1>
            <p className="dash-welcome-sub">
              Manage listed bays, adjust availability, and monitor real-time parking revenue.
            </p>
          </div>

          <button
            className="btn-primary-action"
            style={{ width: 'auto', padding: '0 24px' }}
            onClick={() => setCurrentPage('add-parking')}
          >
            + Add New Space
          </button>
        </div>

        {/* Stats Row */}
        <div className="stats-grid-row">
          <div className="stat-card-clean">
            <div className="stat-card-label">Total Spaces</div>
            <div className="stat-card-number">{totalListings}</div>
          </div>

          <div className="stat-card-clean">
            <div className="stat-card-label">Active & Available</div>
            <div className="stat-card-number" style={{ color: '#10B981' }}>{activeCount}</div>
          </div>

          <div className="stat-card-clean">
            <div className="stat-card-label">Paused Spaces</div>
            <div className="stat-card-number" style={{ color: '#F59E0B' }}>{pausedCount}</div>
          </div>

          <div className="stat-card-clean">
            <div className="stat-card-label">Total Revenue</div>
            <div className="stat-card-number" style={{ color: '#5255EB' }}>₹{totalEarningsINR}</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#12142B' }}>
            My Listed Spaces
          </h2>

          <button
            className="link-btn"
            onClick={() => setCurrentPage('owner-bookings')}
          >
            View Incoming Bookings ({bookings.length}) →
          </button>
        </div>

        {/* Spaces Management Table */}
        <div className="data-table-shell">
          <table>
            <thead>
              <tr>
                <th>Space Details</th>
                <th>Location</th>
                <th>Type</th>
                <th>Target Rate</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {spots.map((spot) => (
                <tr key={spot.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <img
                        src={spot.image}
                        alt=""
                        style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, color: '#12142B' }}>{spot.title}</div>
                        <div style={{ fontSize: '0.82rem', color: '#757999' }}>{spot.vehicleSize}</div>
                      </div>
                    </div>
                  </td>
                  <td>{spot.address}</td>
                  <td><span className="tag-pill">{spot.type}</span></td>
                  <td>
                    <strong style={{ fontFamily: 'Space Grotesk', fontSize: '1.05rem', color: '#12142B' }}>
                      ₹{spot.pricePerHour * 5}/hr
                    </strong>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: 20,
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        background: spot.isAvailable ? '#ECFDF5' : '#FEF2F2',
                        color: spot.isAvailable ? '#10B981' : '#EF4444'
                      }}
                    >
                      {spot.isAvailable ? '● Active' : '○ Paused'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-outline-action"
                      style={{
                        height: 36,
                        padding: '0 14px',
                        fontSize: '0.82rem',
                        color: spot.isAvailable ? '#EF4444' : '#10B981',
                        borderColor: spot.isAvailable ? '#FECACA' : '#A7F3D0'
                      }}
                      onClick={() => toggleSpotAvailability(spot.id)}
                    >
                      {spot.isAvailable ? 'Pause Space' : 'Activate Space'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
