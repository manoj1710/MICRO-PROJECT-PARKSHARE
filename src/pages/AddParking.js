import React, { useState } from 'react';
import { usePark } from '../context/ParkContext';

export default function AddParking() {
  const { addSpot, setCurrentPage } = usePark();

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: 'Downtown',
    pricePerHour: 40,
    type: 'Covered / Garage',
    vehicleSize: 'SUV / Sedan',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    description: '',
    instructions: '',
    amenities: 'CCTV Surveillance, Gated Access, 24/7 Security'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.address || !formData.pricePerHour) {
      alert('Please fill out all required details');
      return;
    }

    const amenitiesList = formData.amenities
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    addSpot({
      ...formData,
      pricePerHour: Number(formData.pricePerHour) / 5, // normalize to base unit
      amenities: amenitiesList,
      lat: 37.7760,
      lng: -122.4180
    });

    alert('Parking space published successfully!');
    setCurrentPage('owner-dashboard');
  };

  return (
    <div className="dashboard-main-viewport" style={{ maxWidth: 840, margin: '0 auto' }}>
      <button
        className="link-btn"
        style={{ marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        onClick={() => setCurrentPage('owner-dashboard')}
      >
        ← Back to Owner Dashboard
      </button>

      <div className="dash-topbar" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="dash-welcome-title">List a New Parking Space</h1>
          <p className="dash-welcome-sub">
            Monetize your unused driveway, garage bay, or residential compound safely.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: '#FFFFFF',
          borderRadius: 24,
          padding: 36,
          border: '1.5px solid #E3E6F4',
          boxShadow: '0 10px 30px rgba(15, 18, 38, 0.05)'
        }}
      >
        <div className="input-group">
          <label className="input-label">Listing Title *</label>
          <input
            type="text"
            className="input-control"
            placeholder="e.g. Spacious Private Driveway near Metro Station"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
          <div className="input-group">
            <label className="input-label">Street Address *</label>
            <input
              type="text"
              className="input-control"
              placeholder="e.g. 742 Evergreen Terrace"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Neighborhood / Area</label>
            <input
              type="text"
              className="input-control"
              placeholder="e.g. Downtown"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div className="input-group">
            <label className="input-label">Hourly Rate (₹/hr) *</label>
            <input
              type="number"
              min="10"
              step="5"
              className="input-control"
              value={formData.pricePerHour}
              onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Parking Type</label>
            <select
              className="input-control"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Covered / Garage">Covered / Garage</option>
              <option value="Driveway">Driveway</option>
              <option value="Basement">Basement</option>
              <option value="Open Paved Lot">Open Paved Lot</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Vehicle Capacity</label>
            <select
              className="input-control"
              value={formData.vehicleSize}
              onChange={(e) => setFormData({ ...formData, vehicleSize: e.target.value })}
            >
              <option value="SUV / Sedan">SUV / Sedan</option>
              <option value="Sedan / Hatchback">Sedan / Hatchback</option>
              <option value="Large SUV / Truck">Large SUV / Truck</option>
              <option value="All Vehicle Types">All Vehicle Types</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Space Photo Image URL</label>
          <input
            type="url"
            className="input-control"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Amenities / Security Features (comma separated)</label>
          <input
            type="text"
            className="input-control"
            placeholder="CCTV Surveillance, EV Charger, Guarded, Well-lit"
            value={formData.amenities}
            onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Description & Landmarks</label>
          <textarea
            className="input-control"
            style={{ height: '90px', padding: '12px 16px', resize: 'vertical' }}
            placeholder="Describe your parking space, gate dimensions, and key advantages..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Access & Gate Entry Instructions</label>
          <textarea
            className="input-control"
            style={{ height: '70px', padding: '12px 16px', resize: 'vertical' }}
            placeholder="e.g. Park on bay #4, security keycode is #4092 at the gate..."
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', gap: 14, marginTop: 28 }}>
          <button
            type="button"
            className="btn-outline-action"
            style={{ flex: 1 }}
            onClick={() => setCurrentPage('owner-dashboard')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary-action"
            style={{ flex: 2 }}
          >
            Publish Parking Space Listing →
          </button>
        </div>
      </form>
    </div>
  );
}
