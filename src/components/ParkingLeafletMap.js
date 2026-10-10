import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom branded purple pricing bubble icon
const createCustomPriceIcon = (price, isSelected) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background: ${isSelected ? '#12142B' : '#5551FF'};
        color: #FFFFFF;
        padding: 5px 12px;
        border-radius: 20px;
        font-weight: 800;
        font-size: 12px;
        box-shadow: 0 4px 14px rgba(85, 81, 255, 0.45);
        border: 2px solid #FFFFFF;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        transform: translate(-50%, -100%);
        cursor: pointer;
        transition: transform 0.2s ease;
      ">
        <span>₹${price * 5}/hr</span>
      </div>
    `,
    iconSize: [60, 30],
    iconAnchor: [30, 30],
    popupAnchor: [0, -32],
  });
};

// Component to dynamically re-center map when active spot changes
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 1.2 });
    }
  }, [center, map]);
  return null;
}

export default function ParkingLeafletMap({ spots, selectedSpotId, onSelectSpot }) {
  // Center defaults to San Francisco downtown cluster coordinates
  const defaultCenter = [37.7749, -122.4194];

  const activeSpot = spots.find((s) => s.id === selectedSpotId);
  const mapCenter = activeSpot ? [activeSpot.lat, activeSpot.lng] : defaultCenter;

  return (
    <div style={{ height: '100%', width: '100%', minHeight: '580px', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <MapRecenter center={mapCenter} />

        {/* Free OpenStreetMap Standard Tile Layer - 100% free, no API key required */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {spots.map((spot) => {
          const isSelected = spot.id === selectedSpotId;
          const position = [spot.lat, spot.lng];

          return (
            <Marker
              key={spot.id}
              position={position}
              icon={createCustomPriceIcon(spot.pricePerHour, isSelected)}
              eventHandlers={{
                click: () => onSelectSpot(spot.id),
              }}
            >
              <Popup>
                <div style={{ padding: '4px', maxWidth: '200px' }}>
                  <img
                    src={spot.image}
                    alt={spot.title}
                    style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                  />
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#12142B', lineHeight: 1.2 }}>
                    {spot.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#757999', margin: '4px 0' }}>
                    📍 {spot.address}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <strong style={{ color: '#5551FF', fontSize: '1rem' }}>₹{spot.pricePerHour * 5}/hr</strong>
                    <button
                      style={{
                        background: '#5551FF',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onClick={() => onSelectSpot(spot.id)}
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Map Legend HUD */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '8px 16px',
          borderRadius: '30px',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#12142B',
          boxShadow: '0 4px 14px rgba(15, 18, 38, 0.12)',
          zIndex: 1000,
          border: '1px solid #E3E6F4'
        }}
      >
        🗺️ Leaflet Live Map • {spots.length} spaces ready to reserve
      </div>
    </div>
  );
}
