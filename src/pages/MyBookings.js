import React from 'react';
import { usePark } from '../context/ParkContext';

export default function MyBookings() {
  const { bookings, setCurrentPage } = usePark();

  return (
    <div className="dashboard-main-viewport">
      <div className="dash-topbar">
        <div>
          <h1 className="dash-welcome-title">My Parking Reservations</h1>
          <p className="dash-welcome-sub">View and manage your active and past parking access passes.</p>
        </div>

        <button
          className="btn-primary-action"
          style={{ width: 'auto', padding: '0 24px' }}
          onClick={() => setCurrentPage('driver-dashboard')}
        >
          + Find More Parking
        </button>
      </div>

      {bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '70px', background: '#FFFFFF', borderRadius: 20, border: '1px solid #E5E7F2' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🎫</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#12142B' }}>No reservations yet</h3>
          <p style={{ color: '#757999', margin: '8px 0 24px' }}>
            Book private spots in advance to guarantee your parking bay.
          </p>
          <button
            className="btn-primary-action"
            style={{ width: 220, margin: '0 auto' }}
            onClick={() => setCurrentPage('driver-dashboard')}
          >
            Find Parking Spots
          </button>
        </div>
      ) : (
        <div className="data-table-shell">
          <table>
            <thead>
              <tr>
                <th>Pass Ref</th>
                <th>Parking Bay</th>
                <th>Schedule</th>
                <th>Vehicle Plate</th>
                <th>Total Paid</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#5255EB', background: '#EEF0FD', padding: '4px 8px', borderRadius: 6 }}>
                      {b.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 800, color: '#12142B' }}>{b.spotTitle}</div>
                    <div style={{ fontSize: '0.82rem', color: '#757999' }}>📍 {b.address}</div>
                  </td>
                  <td>
                    <div><strong>{b.date}</strong></div>
                    <div style={{ fontSize: '0.82rem', color: '#757999' }}>{b.startTime} - {b.endTime} ({b.durationHours} hrs)</div>
                  </td>
                  <td>
                    <span style={{ background: '#F1F2FD', padding: '4px 8px', borderRadius: 6, fontWeight: 700, fontSize: '0.85rem' }}>
                      {b.vehicleNumber}
                    </span>
                  </td>
                  <td>
                    <strong style={{ fontFamily: 'Space Grotesk', fontSize: '1.05rem', color: '#12142B' }}>
                      ₹{b.totalPrice}
                    </strong>
                  </td>
                  <td>
                    <span style={{ background: '#ECFDF5', color: '#10B981', padding: '4px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 800 }}>
                      ● Active Pass
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-outline-action"
                      style={{ height: 36, padding: '0 14px', fontSize: '0.82rem' }}
                      onClick={() => alert(`Showing digital barcode & gate pass for reservation ${b.id}`)}
                    >
                      Show Pass
                    </button>
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
