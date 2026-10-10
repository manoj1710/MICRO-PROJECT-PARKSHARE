import React from 'react';
import { usePark } from '../context/ParkContext';

export default function ParkingDetails() {
  const { selectedSpotId, spots, setCurrentPage, setPendingBooking } = usePark();

  const spot = spots.find((s) => s.id === selectedSpotId) || spots[0];

  if (!spot) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <h2>Spot not found</h2>
        <button className="btn-primary-action" style={{ width: 220, margin: '20px auto' }} onClick={() => setCurrentPage('driver-dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const inrRate = spot.pricePerHour * 5;

  const handleStartBooking = () => {
    setPendingBooking({
      spotId: spot.id,
      spotTitle: spot.title,
      address: spot.address,
      pricePerHour: inrRate,
      ownerName: spot.ownerName,
      ownerPhone: spot.ownerPhone
    });
    setCurrentPage('booking');
  };

  return (
    <div className="dashboard-main-viewport" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <button
        className="link-btn"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}
        onClick={() => setCurrentPage('driver-dashboard')}
      >
        ← Back to Search Results
      </button>

      <div style={{ background: '#FFFFFF', borderRadius: 24, border: '1px solid #E5E7F2', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
        <img
          src={spot.image}
          alt={spot.title}
          style={{ width: '100%', height: 380, objectFit: 'cover' }}
        />

        <div style={{ padding: 40, display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: 40 }}>
          {/* Left details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span className="tag-pill" style={{ background: '#EEF0FD', color: '#5255EB', fontWeight: 800 }}>
                {spot.type}
              </span>
              <span className="tag-pill" style={{ background: '#ECFDF5', color: '#10B981', fontWeight: 800 }}>
                ● Active & Verified
              </span>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#12142B', marginBottom: 8, letterSpacing: -0.5 }}>
              {spot.title}
            </h1>
            <p style={{ color: '#757999', fontSize: '1rem', marginBottom: 24 }}>
              📍 {spot.address}, {spot.city}
            </p>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 10, color: '#12142B' }}>
              About this parking space
            </h3>
            <p style={{ color: '#424667', lineHeight: 1.7, marginBottom: 28 }}>
              {spot.description}
            </p>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 12, color: '#12142B' }}>
              Amenities & Security
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 28 }}>
              {spot.amenities.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#F8F9FE',
                    border: '1px solid #E5E7F2',
                    padding: '12px 16px',
                    borderRadius: 12,
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: '#12142B',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <span style={{ color: '#5255EB' }}>✓</span> {item}
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 10, color: '#12142B' }}>
              Host Access Instructions
            </h3>
            <div style={{ background: '#EEF0FD', border: '1px solid #D9DCF7', borderRadius: 14, padding: '18px 20px', color: '#3538C4', fontSize: '0.94rem' }}>
              <strong>🔒 Gate Entry Guide:</strong> {spot.instructions}
            </div>
          </div>

          {/* Right Reserve Box */}
          <div>
            <div style={{ background: '#F8F9FE', border: '1.5px solid #E5E7F2', borderRadius: 20, padding: 32, position: 'sticky', top: 100 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
                <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#5255EB', fontFamily: 'Space Grotesk' }}>
                  ₹{inrRate}
                </span>
                <span style={{ color: '#757999', fontWeight: 600 }}>per hour</span>
              </div>

              <div style={{ background: '#FFFFFF', padding: 18, borderRadius: 14, border: '1px solid #E5E7F2', marginBottom: 24 }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#757999', fontWeight: 700, letterSpacing: 0.5 }}>
                  Verified Peer Host
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#12142B', marginTop: 4 }}>
                  {spot.ownerName}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600, marginTop: 2 }}>
                  ⭐ 4.9 Superhost Rating
                </div>
              </div>

              <button
                className="btn-primary-action"
                style={{ width: '100%', height: 54 }}
                onClick={handleStartBooking}
              >
                Proceed to Reservation →
              </button>

              <div style={{ textAlign: 'center', marginTop: 14, fontSize: '0.82rem', color: '#757999' }}>
                Instant confirmation • Free cancellation up to 1 hr before
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
