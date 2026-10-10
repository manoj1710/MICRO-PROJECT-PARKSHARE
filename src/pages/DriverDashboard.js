import React, { useState } from 'react';
import { usePark } from '../context/ParkContext';
import ParkingLeafletMap from '../components/ParkingLeafletMap';

export default function DriverDashboard() {
  const { spots, setSelectedSpotId, setCurrentPage, currentUser } = usePark();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priceSort, setPriceSort] = useState('default');
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'map' | 'list'
  const [activePinId, setActivePinId] = useState(null);

  // Filter and sort listings
  let filteredSpots = spots.filter((spot) => {
    const matchesSearch =
      spot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spot.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spot.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === 'All' ? true : spot.type.toLowerCase().includes(typeFilter.toLowerCase());

    return matchesSearch && matchesType && spot.isAvailable;
  });

  if (priceSort === 'low-high') {
    filteredSpots.sort((a, b) => a.pricePerHour - b.pricePerHour);
  } else if (priceSort === 'high-low') {
    filteredSpots.sort((a, b) => b.pricePerHour - a.pricePerHour);
  }

  const handleSpotClick = (id) => {
    setSelectedSpotId(id);
    setCurrentPage('parking-details');
  };

  return (
    <div className="dashboard-shell">
      {/* ================= SIDEBAR NAVIGATION ================= */}
      <aside className="dashboard-sidebar">
        <div>
          <div className="sidebar-section-heading">Driver Tools</div>
          <div className="sidebar-menu-group">
            <button className="sidebar-link-btn active">
              <span className="btn-icon">🔍</span> Find Parking
            </button>
            <button
              className="sidebar-link-btn"
              onClick={() => setCurrentPage('my-bookings')}
            >
              <span className="btn-icon">🎫</span> My Bookings
            </button>
            <button
              className="sidebar-link-btn"
              onClick={() => setCurrentPage('saved-places')}
            >
              <span className="btn-icon">⭐</span> Saved Places
            </button>
          </div>

          <div className="sidebar-section-heading" style={{ marginTop: 24 }}>Preferences</div>
          <div className="sidebar-menu-group">
            <button
              className="sidebar-link-btn"
              onClick={() => setCurrentPage('vehicle-profiles')}
            >
              <span className="btn-icon">🚗</span> Vehicle Profiles
            </button>
            <button
              className="sidebar-link-btn"
              onClick={() => setCurrentPage('payment-methods')}
            >
              <span className="btn-icon">💳</span> Payment Methods
            </button>
          </div>
        </div>

        {/* Live Support / Quick Info Box */}
        <div style={{ background: '#F1F2FD', padding: 16, borderRadius: 12, border: '1px solid #E5E7F2' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#5255EB', marginBottom: 4 }}>
            24/7 Driver Concierge
          </div>
          <div style={{ fontSize: '0.78rem', color: '#757999' }}>
            Need help locating your reserved bay? Tap live support.
          </div>
        </div>
      </aside>

      {/* ================= MAIN DASHBOARD CONTENT ================= */}
      <main className="dashboard-main-viewport">
        {/* Topbar Header */}
        <div className="dash-topbar">
          <div>
            <h1 className="dash-welcome-title">
              Welcome back, {currentUser?.name?.split(' ')[0] || 'Driver'} 👋
            </h1>
            <p className="dash-welcome-sub">
              Search verified parking spaces across high-demand urban clusters.
            </p>
          </div>

          <button
            className="btn-outline-action"
            onClick={() => setCurrentPage('my-bookings')}
          >
            🎫 View Active Passes
          </button>
        </div>

        {/* Search & Filter Hub */}
        <div className="driver-search-hub">
          <div className="search-field-large">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by neighborhood, street name, or landmark..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="select-filter-box"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Parking Types</option>
            <option value="Covered">Covered / Garage</option>
            <option value="Driveway">Driveway</option>
            <option value="Basement">Basement</option>
            <option value="Open">Open Paved Lot</option>
          </select>

          <select
            className="select-filter-box"
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="default">Sort by Price</option>
            <option value="low-high">Lowest Price First</option>
            <option value="high-low">Highest Price First</option>
          </select>

          {/* View toggle */}
          <div className="view-toggle-pills">
            <button
              className={`view-toggle-btn ${viewMode === 'split' ? 'active' : ''}`}
              onClick={() => setViewMode('split')}
            >
              Split View
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              Map
            </button>
          </div>
        </div>

        {/* ================= SPLIT VIEW: PURPLE MAP & LISTINGS ================= */}
        <div className="driver-content-split">
          {/* Real Leaflet Map */}
          {viewMode !== 'list' && (
            <ParkingLeafletMap
              spots={filteredSpots}
              selectedSpotId={activePinId}
              onSelectSpot={handleSpotClick}
            />
          )}

          {/* Listings Scroll Deck */}
          {viewMode !== 'map' && (
            <div
              className="listings-scroll-deck"
              style={{ gridColumn: viewMode === 'list' ? '1 / -1' : 'auto' }}
            >
              {filteredSpots.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', background: '#FFFFFF', borderRadius: 16, border: '1px solid #E5E7F2' }}>
                  <p style={{ color: '#757999', fontSize: '1.05rem' }}>No parking spaces match your search criteria.</p>
                  <button
                    className="link-btn"
                    style={{ marginTop: 10, display: 'inline-block' }}
                    onClick={() => { setSearchTerm(''); setTypeFilter('All'); }}
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                filteredSpots.map((spot) => (
                  <div
                    key={spot.id}
                    className={`parking-card-premium ${activePinId === spot.id ? 'active' : ''}`}
                    onMouseEnter={() => setActivePinId(spot.id)}
                    onClick={() => handleSpotClick(spot.id)}
                  >
                    <img src={spot.image} alt={spot.title} className="parking-card-img" />
                    
                    <div className="parking-card-details">
                      <div>
                        <div className="parking-card-header">
                          <h3 className="parking-title">{spot.title}</h3>
                          <div className="parking-price-tag">
                            ₹{spot.pricePerHour * 5}
                            <span> / hour</span>
                          </div>
                        </div>

                        <div className="parking-meta-text">
                          <span>📍 {spot.address}</span>
                          <span>•</span>
                          <span style={{ color: '#10B981', fontWeight: 700 }}>Available now</span>
                        </div>
                      </div>

                      <div className="tag-pills-row">
                        <span className="tag-pill">⭐ {spot.rating}</span>
                        <span className="tag-pill">{spot.type}</span>
                        <span className="tag-pill">{spot.vehicleSize}</span>
                        {spot.amenities.slice(0, 1).map((am, i) => (
                          <span key={i} className="tag-pill">{am}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
