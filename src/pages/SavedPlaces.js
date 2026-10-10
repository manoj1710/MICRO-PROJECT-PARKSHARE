import React from 'react';
import { usePark } from '../context/ParkContext';

export default function SavedPlaces() {
  const { spots, setSelectedSpotId, setCurrentPage } = usePark();

  // Saved spaces (using first 2 spots as default saved spots)
  const savedSpots = spots.slice(0, 2);

  const handleSpotClick = (id) => {
    setSelectedSpotId(id);
    setCurrentPage('parking-details');
  };

  return (
    <div className="dashboard-main-viewport" style={{ maxWidth: 1000 }}>
      <div className="dash-topbar">
        <div>
          <h1 className="dash-welcome-title">⭐ Saved Places</h1>
          <p className="dash-welcome-sub">Quickly re-book your favorite parking slots and trusted driveways.</p>
        </div>

        <button
          className="btn-primary-action"
          style={{ width: 'auto', padding: '0 24px' }}
          onClick={() => setCurrentPage('driver-dashboard')}
        >
          + Find More Spots
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {savedSpots.map((spot) => (
          <div
            key={spot.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              border: '1.5px solid #E3E6F4',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(15, 18, 38, 0.05)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onClick={() => handleSpotClick(spot.id)}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={spot.image}
                alt={spot.title}
                style={{ width: '100%', height: 180, objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#EF4444',
                  padding: '6px 10px',
                  borderRadius: 20,
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                ❤️ Saved
              </span>
            </div>

            <div style={{ padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#12142B', lineHeight: 1.3 }}>
                  {spot.title}
                </h3>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#5551FF', fontFamily: 'Space Grotesk' }}>
                  ₹{spot.pricePerHour * 5}<span>/hr</span>
                </span>
              </div>

              <p style={{ color: '#8086A8', fontSize: '0.88rem', marginBottom: 16 }}>
                📍 {spot.address}
              </p>

              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                <span className="tag-pill">{spot.type}</span>
                <span className="tag-pill">{spot.vehicleSize}</span>
                <span className="tag-pill">⭐ {spot.rating}</span>
              </div>

              <button
                className="btn-primary-action"
                style={{ height: 44, fontSize: '0.92rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpotClick(spot.id);
                }}
              >
                Reserve Space Again →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
