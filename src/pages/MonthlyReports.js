import React, { useState } from 'react';
import { usePark } from '../context/ParkContext';

export default function MonthlyReports() {
  const { setCurrentPage } = usePark();

  const [reports] = useState([
    {
      month: 'September 2026',
      totalBookings: 42,
      occupancyRate: '78%',
      grossEarnings: '₹14,280',
      platformCommission: '₹1,428',
      netPayout: '₹12,852',
      status: 'Settled & Paid'
    },
    {
      month: 'August 2026',
      totalBookings: 38,
      occupancyRate: '72%',
      grossEarnings: '₹12,940',
      platformCommission: '₹1,294',
      netPayout: '₹11,646',
      status: 'Settled & Paid'
    },
    {
      month: 'July 2026',
      totalBookings: 31,
      occupancyRate: '65%',
      grossEarnings: '₹10,500',
      platformCommission: '₹1,050',
      netPayout: '₹9,450',
      status: 'Settled & Paid'
    }
  ]);

  return (
    <div className="dashboard-main-viewport">
      <button
        className="link-btn"
        style={{ marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        onClick={() => setCurrentPage('owner-dashboard')}
      >
        ← Back to Owner Dashboard
      </button>

      <div className="dash-topbar">
        <div>
          <h1 className="dash-welcome-title">📄 Monthly Revenue & Tax Reports</h1>
          <p className="dash-welcome-sub">
            Review your historical monthly occupancy, gross earnings, and downloadable tax invoices.
          </p>
        </div>

        <button
          className="btn-outline-action"
          onClick={() => alert('Downloading cumulative Annual Tax Statement (FY 2026-27)...')}
        >
          📥 Download Full Annual PDF
        </button>
      </div>

      {/* Reports Table */}
      <div className="data-table-shell">
        <table>
          <thead>
            <tr>
              <th>Billing Period</th>
              <th>Total Bookings</th>
              <th>Occupancy Rate</th>
              <th>Gross Revenue</th>
              <th>ParkShare Fee (10%)</th>
              <th>Net Disbursed</th>
              <th>Status</th>
              <th>Tax Invoice</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i}>
                <td>
                  <strong>{r.month}</strong>
                </td>
                <td>{r.totalBookings} reservations</td>
                <td>
                  <span className="tag-pill" style={{ background: '#ECFDF5', color: '#10B981' }}>
                    {r.occupancyRate}
                  </span>
                </td>
                <td>
                  <strong>{r.grossEarnings}</strong>
                </td>
                <td style={{ color: '#8086A8' }}>
                  -{r.platformCommission}
                </td>
                <td>
                  <strong style={{ fontFamily: 'Space Grotesk', fontSize: '1.05rem', color: '#10B981' }}>
                    {r.netPayout}
                  </strong>
                </td>
                <td>
                  <span style={{ background: '#ECFDF5', color: '#10B981', padding: '4px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 800 }}>
                    ● {r.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-outline-action"
                    style={{ height: 34, padding: '0 12px', fontSize: '0.8rem' }}
                    onClick={() => alert(`Downloading GST Invoice and breakdown PDF for ${r.month}`)}
                  >
                    📄 Invoice PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
