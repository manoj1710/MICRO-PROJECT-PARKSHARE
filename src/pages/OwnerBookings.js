import React from 'react';
import { usePark } from '../context/ParkContext';

export default function OwnerBookings() {
  const { bookings, setCurrentPage } = usePark();

  return (
    <div className="dashboard-main-viewport">
      <div className="dash-topbar">
        <div>
          <h1 className="dash-welcome-title">Incoming Bookings for Your Spaces</h1>
          <p className="dash-welcome-sub">Live log of driver reservations for your parking listings.</p>
        </div>

        <button
          className="btn-primary-action"
          style={{ width: 'auto', padding: '0 24px' }}
          onClick={() => setCurrentPage('owner-dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>

      {bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '70px', background: '#FFFFFF', borderRadius: 20, border: '1px solid #E3E6F4' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📬</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#12142B' }}>No incoming bookings yet</h3>
          <p style={{ color: '#8086A8', margin: '8px 0 24px' }}>
            When drivers book your spaces, their reservation passes and arrival times will appear here.
          </p>
        </div>
      ) : (
        <div className="data-table-shell">
          <table>
            <thead>
              <tr>
                <th>Booking Ref</th>
                <th>Space Reserved</th>
                <th>Driver Info</th>
                <th>Reservation Schedule</th>
                <th>Vehicle Plate</th>
                <th>Host Payout</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#5551FF', background: '#EEEDFF', padding: '4px 8px', borderRadius: 6 }}>
                      {b.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 800, color: '#12142B' }}>{b.spotTitle}</div>
                    <div style={{ fontSize: '0.82rem', color: '#8086A8' }}>📍 {b.address}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#12142B' }}>{b.driverName}</div>
                    <div style={{ fontSize: '0.82rem', color: '#8086A8' }}>{b.driverEmail || 'Verified Driver'}</div>
                  </td>
                  <td>
                    <div><strong>{b.date}</strong></div>
                    <div style={{ fontSize: '0.82rem', color: '#8086A8' }}>{b.startTime} - {b.endTime} ({b.durationHours} hrs)</div>
                  </td>
                  <td>
                    <span style={{ background: '#F1F3FB', padding: '4px 8px', borderRadius: 6, fontWeight: 700, fontSize: '0.85rem' }}>
                      {b.vehicleNumber}
                    </span>
                  </td>
                  <td>
                    <strong style={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', color: '#10B981' }}>
                      +₹{b.totalPrice || 160}
                    </strong>
                  </td>
                  <td>
                    <span style={{ background: '#ECFDF5', color: '#10B981', padding: '4px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 800 }}>
                      ● Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
