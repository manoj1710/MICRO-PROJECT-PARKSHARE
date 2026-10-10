import React, { useState } from 'react';
import { usePark } from '../context/ParkContext';

export default function VehicleProfiles() {
  const { setCurrentPage } = usePark();

  const [vehicles, setVehicles] = useState([
    {
      id: 'v1',
      makeModel: 'Honda City ZX',
      licensePlate: 'MH 02 AB 1234',
      type: 'Sedan',
      color: 'Platinum White',
      isDefault: true
    },
    {
      id: 'v2',
      makeModel: 'Hyundai Creta SX(O)',
      licensePlate: 'MH 02 CZ 9876',
      type: 'SUV',
      color: 'Phantom Black',
      isDefault: false
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMakeModel, setNewMakeModel] = useState('');
  const [newPlate, setNewPlate] = useState('');
  const [newType, setNewType] = useState('Sedan');
  const [newColor, setNewColor] = useState('Silver');

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!newMakeModel || !newPlate) {
      alert('Please enter vehicle details');
      return;
    }

    const created = {
      id: 'v-' + Date.now(),
      makeModel: newMakeModel,
      licensePlate: newPlate.toUpperCase(),
      type: newType,
      color: newColor,
      isDefault: false
    };

    setVehicles([...vehicles, created]);
    setShowAddModal(false);
    setNewMakeModel('');
    setNewPlate('');
  };

  const setDefaultVehicle = (id) => {
    setVehicles(vehicles.map((v) => ({ ...v, isDefault: v.id === id })));
  };

  const removeVehicle = (id) => {
    if (vehicles.length <= 1) {
      alert('You must have at least one registered vehicle.');
      return;
    }
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  return (
    <div className="dashboard-main-viewport" style={{ maxWidth: 900 }}>
      <div className="dash-topbar">
        <div>
          <h1 className="dash-welcome-title">🚗 Vehicle Profiles</h1>
          <p className="dash-welcome-sub">Manage your registered vehicles for automatic license plate gate access.</p>
        </div>

        <button
          className="btn-primary-action"
          style={{ width: 'auto', padding: '0 24px' }}
          onClick={() => setShowAddModal(true)}
        >
          + Add New Vehicle
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
        {vehicles.map((v) => (
          <div
            key={v.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              padding: 26,
              border: v.isDefault ? '2px solid #5551FF' : '1.5px solid #E3E6F4',
              boxShadow: '0 8px 24px rgba(15, 18, 38, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            {v.isDefault && (
              <span
                style={{
                  position: 'absolute',
                  top: 18,
                  right: 18,
                  background: '#EEEDFF',
                  color: '#5551FF',
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: '0.78rem',
                  fontWeight: 800
                }}
              >
                ★ Primary Vehicle
              </span>
            )}

            <div>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: '#F4F6FD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: 16 }}>
                🚘
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#12142B', marginBottom: 6 }}>
                {v.makeModel}
              </h3>
              <div style={{ display: 'inline-block', background: '#0F1226', color: '#FFFFFF', fontFamily: 'monospace', padding: '6px 14px', borderRadius: 8, fontWeight: 800, fontSize: '0.95rem', letterSpacing: '1px', marginBottom: 14 }}>
                {v.licensePlate}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#8086A8' }}>
                Class: <strong>{v.type}</strong> • Color: <strong>{v.color}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24, paddingTop: 16, borderTop: '1px solid #E3E6F4' }}>
              {!v.isDefault && (
                <button
                  className="btn-outline-action"
                  style={{ flex: 1, height: 38, fontSize: '0.82rem' }}
                  onClick={() => setDefaultVehicle(v.id)}
                >
                  Set as Default
                </button>
              )}
              <button
                className="btn-outline-action"
                style={{ height: 38, fontSize: '0.82rem', color: '#EF4444', borderColor: '#FECACA' }}
                onClick={() => removeVehicle(v.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="drawer-backdrop" onClick={() => setShowAddModal(false)}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#FFFFFF',
              borderRadius: 24,
              padding: 36,
              width: '100%',
              maxWidth: 480,
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#12142B', marginBottom: 6 }}>
              Register New Vehicle
            </h2>
            <p style={{ color: '#8086A8', fontSize: '0.9rem', marginBottom: 24 }}>
              Used for automatic boom barrier clearance and host arrival records.
            </p>

            <form onSubmit={handleAddVehicle}>
              <div className="input-group">
                <label className="input-label">Make & Model</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="e.g. Honda City / Tata Nexon"
                  value={newMakeModel}
                  onChange={(e) => setNewMakeModel(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">License Plate Number</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="e.g. DL 01 AB 5678"
                  value={newPlate}
                  onChange={(e) => setNewPlate(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="input-group">
                  <label className="input-label">Body Class</label>
                  <select
                    className="input-control"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="EV">Electric Vehicle</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Color</label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="White / Black"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button
                  type="button"
                  className="btn-outline-action"
                  style={{ flex: 1 }}
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-action" style={{ flex: 1 }}>
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
