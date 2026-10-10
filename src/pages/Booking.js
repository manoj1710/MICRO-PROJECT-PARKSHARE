import React, { useState } from 'react';
import { usePark } from '../context/ParkContext';

export default function Booking() {
  const { pendingBooking, createBooking, setCurrentPage } = usePark();

  const [date, setDate] = useState('2026-10-12');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('13:00');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!pendingBooking) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <h2>No parking space selected</h2>
        <button
          className="btn-primary-action"
          style={{ width: 220, margin: '20px auto' }}
          onClick={() => setCurrentPage('driver-dashboard')}
        >
          Discover Spaces
        </button>
      </div>
    );
  }

  // Calculate pricing
  const startHour = parseInt(startTime.split(':')[0], 10) || 9;
  const endHour = parseInt(endTime.split(':')[0], 10) || 13;
  const durationHours = Math.max(1, endHour - startHour);
  const baseCost = durationHours * pendingBooking.pricePerHour;
  const convenienceFee = 15;
  const grandTotal = baseCost + convenienceFee;

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (!vehicleNumber) {
      alert('Please enter your vehicle license plate number.');
      return;
    }

    const booking = createBooking({
      spotId: pendingBooking.spotId,
      spotTitle: pendingBooking.spotTitle,
      address: pendingBooking.address,
      ownerName: pendingBooking.ownerName,
      date,
      startTime,
      endTime,
      durationHours,
      totalPrice: grandTotal,
      vehicleNumber
    });

    setConfirmedBooking(booking);
  };

  // Receipt / Success Pass Screen
  if (confirmedBooking) {
    return (
      <div className="wizard-page">
        <div className="wizard-card" style={{ maxWidth: 540, textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: 24, background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', margin: '0 auto 20px' }}>
            ✓
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#12142B', marginBottom: 6 }}>
            Reservation Confirmed!
          </h2>
          <p style={{ color: '#757999', fontSize: '0.95rem', marginBottom: 28 }}>
            Pass reference: <strong style={{ color: '#5255EB' }}>{confirmedBooking.id}</strong>
          </p>

          <div style={{ background: '#F8F9FE', border: '1.5px dashed #D6D9F2', borderRadius: 18, padding: 24, textAlign: 'left', marginBottom: 28 }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#12142B' }}>
              {confirmedBooking.spotTitle}
            </div>
            <div style={{ fontSize: '0.86rem', color: '#757999', margin: '4px 0 16px' }}>
              📍 {confirmedBooking.address}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: '#757999', display: 'block', fontSize: '0.78rem' }}>DATE</span>
                <strong>{confirmedBooking.date}</strong>
              </div>
              <div>
                <span style={{ color: '#757999', display: 'block', fontSize: '0.78rem' }}>TIMING</span>
                <strong>{confirmedBooking.startTime} - {confirmedBooking.endTime}</strong>
              </div>
              <div>
                <span style={{ color: '#757999', display: 'block', fontSize: '0.78rem' }}>VEHICLE PLATE</span>
                <strong>{confirmedBooking.vehicleNumber}</strong>
              </div>
              <div>
                <span style={{ color: '#757999', display: 'block', fontSize: '0.78rem' }}>TOTAL CHARGED</span>
                <strong style={{ color: '#5255EB' }}>₹{confirmedBooking.totalPrice}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            <button
              className="btn-primary-action"
              style={{ flex: 1 }}
              onClick={() => setCurrentPage('my-bookings')}
            >
              Go to My Passes
            </button>
            <button
              className="btn-outline-action"
              style={{ flex: 1 }}
              onClick={() => setCurrentPage('driver-dashboard')}
            >
              Explore Map
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-main-viewport" style={{ maxWidth: 900, margin: '0 auto' }}>
      <button
        className="link-btn"
        style={{ marginBottom: 20, display: 'inline-block' }}
        onClick={() => setCurrentPage('parking-details')}
      >
        ← Back to Details
      </button>

      <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#12142B', marginBottom: 6 }}>
        Confirm Your Reservation
      </h1>
      <p style={{ color: '#757999', marginBottom: 32 }}>
        Review your time schedule and vehicle information.
      </p>

      <form onSubmit={handleConfirmReservation} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr', gap: 32 }}>
        <div style={{ background: '#FFFFFF', padding: 32, borderRadius: 20, border: '1px solid #E5E7F2' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 20 }}>
            1. Booking Schedule
          </h3>

          <div className="input-group">
            <label className="input-label">Date</label>
            <input
              type="date"
              className="input-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="input-group">
              <label className="input-label">Arrival Time</label>
              <input
                type="time"
                className="input-control"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Departure Time</label>
              <input
                type="time"
                className="input-control"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '28px 0 16px' }}>
            2. Vehicle Details
          </h3>

          <div className="input-group">
            <label className="input-label">License Plate Number</label>
            <input
              type="text"
              className="input-control"
              placeholder="e.g. MH 02 AB 1234"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Summary Card */}
        <div>
          <div style={{ background: '#F8F9FE', border: '1.5px solid #E5E7F2', borderRadius: 20, padding: 28 }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 16 }}>
              Price Breakdown
            </h3>

            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#12142B', marginBottom: 4 }}>
              {pendingBooking.spotTitle}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#757999', marginBottom: 20 }}>
              {pendingBooking.address}
            </div>

            <div style={{ borderTop: '1px solid #E5E7F2', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <span>₹{pendingBooking.pricePerHour} × {durationHours} hours</span>
                <strong>₹{baseCost}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <span>ParkShare Service Fee</span>
                <strong>₹{convenienceFee}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #E5E7F2', paddingTop: 14, fontSize: '1.25rem', fontWeight: 800, color: '#5255EB', fontFamily: 'Space Grotesk' }}>
                <span>Total Amount</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary-action"
              style={{ width: '100%', marginTop: 24 }}
            >
              Confirm & Book Bay
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
