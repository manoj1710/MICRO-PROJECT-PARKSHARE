import React, { useState } from 'react';
import { usePark } from '../context/ParkContext';

export default function PaymentMethods() {
  const { setCurrentPage } = usePark();

  const [methods, setMethods] = useState([
    {
      id: 'pm-1',
      type: 'UPI',
      title: 'Google Pay / PhonePe',
      identifier: 'alex.mercer@oksbi',
      isDefault: true,
      badgeColor: '#10B981'
    },
    {
      id: 'pm-2',
      type: 'CARD',
      title: 'HDFC Bank Visa Platinum',
      identifier: '•••• •••• •••• 4092',
      expiry: '08/29',
      isDefault: false,
      badgeColor: '#5551FF'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [methodType, setMethodType] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (methodType === 'UPI') {
      if (!upiId) return alert('Please enter your UPI ID');
      setMethods([
        ...methods,
        {
          id: 'pm-' + Date.now(),
          type: 'UPI',
          title: 'UPI Virtual Payment Address',
          identifier: upiId,
          isDefault: false,
          badgeColor: '#10B981'
        }
      ]);
    } else {
      if (!cardNumber || !cardHolder) return alert('Please enter card details');
      setMethods([
        ...methods,
        {
          id: 'pm-' + Date.now(),
          type: 'CARD',
          title: cardHolder + ' Card',
          identifier: '•••• •••• •••• ' + cardNumber.slice(-4),
          expiry: cardExpiry || '12/28',
          isDefault: false,
          badgeColor: '#5551FF'
        }
      ]);
    }
    setShowAddModal(false);
    setUpiId('');
    setCardNumber('');
  };

  const setDefaultMethod = (id) => {
    setMethods(methods.map((m) => ({ ...m, isDefault: m.id === id })));
  };

  return (
    <div className="dashboard-main-viewport" style={{ maxWidth: 860 }}>
      <div className="dash-topbar">
        <div>
          <h1 className="dash-welcome-title">💳 Payment Methods</h1>
          <p className="dash-welcome-sub">Manage your instant 1-click booking payment instruments and wallet.</p>
        </div>

        <button
          className="btn-primary-action"
          style={{ width: 'auto', padding: '0 24px' }}
          onClick={() => setShowAddModal(true)}
        >
          + Add Payment Option
        </button>
      </div>

      {/* Wallet Balance Hero Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #15182D 0%, #202645 100%)',
          borderRadius: 24,
          padding: '28px 32px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
          boxShadow: '0 12px 30px rgba(15, 18, 38, 0.15)'
        }}
      >
        <div>
          <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: '#8E94B8', fontWeight: 700, letterSpacing: '0.8px' }}>
            ParkShare Express Balance
          </span>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '2.4rem', fontWeight: 800, marginTop: 4 }}>
            ₹1,250.00
          </div>
          <div style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 700, marginTop: 2 }}>
            ● Auto-reload active from default payment
          </div>
        </div>

        <button
          className="btn-outline-action"
          style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.25)', height: 44 }}
          onClick={() => alert('Add money dialog initiated.')}
        >
          + Add Money
        </button>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#12142B', marginBottom: 16 }}>
        Linked Payment Instruments
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {methods.map((m) => (
          <div
            key={m.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 18,
              padding: '22px 26px',
              border: m.isDefault ? '2px solid #5551FF' : '1.5px solid #E3E6F4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(15, 18, 38, 0.04)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: m.type === 'UPI' ? '#ECFDF5' : '#EEEDFF',
                  color: m.badgeColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 800
                }}
              >
                {m.type === 'UPI' ? '⚡' : '💳'}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#12142B' }}>
                    {m.title}
                  </h4>
                  {m.isDefault && (
                    <span style={{ background: '#EEEDFF', color: '#5551FF', padding: '3px 10px', borderRadius: 20, fontSize: '0.74rem', fontWeight: 800 }}>
                      DEFAULT
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#8086A8', marginTop: 3 }}>
                  {m.identifier} {m.expiry && `• Exp: ${m.expiry}`}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              {!m.isDefault && (
                <button
                  className="btn-outline-action"
                  style={{ height: 38, fontSize: '0.84rem' }}
                  onClick={() => setDefaultMethod(m.id)}
                >
                  Make Default
                </button>
              )}
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
              Add Payment Option
            </h2>
            <p style={{ color: '#8086A8', fontSize: '0.9rem', marginBottom: 20 }}>
              Encrypted with bank-grade 256-bit SSL protocols.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              <button
                type="button"
                className={`btn-outline-action ${methodType === 'UPI' ? 'active' : ''}`}
                style={{
                  borderColor: methodType === 'UPI' ? '#5551FF' : '#E3E6F4',
                  background: methodType === 'UPI' ? '#EEEDFF' : '#FFFFFF',
                  color: methodType === 'UPI' ? '#5551FF' : '#12142B'
                }}
                onClick={() => setMethodType('UPI')}
              >
                ⚡ UPI ID / VPA
              </button>
              <button
                type="button"
                className={`btn-outline-action ${methodType === 'CARD' ? 'active' : ''}`}
                style={{
                  borderColor: methodType === 'CARD' ? '#5551FF' : '#E3E6F4',
                  background: methodType === 'CARD' ? '#EEEDFF' : '#FFFFFF',
                  color: methodType === 'CARD' ? '#5551FF' : '#12142B'
                }}
                onClick={() => setMethodType('CARD')}
              >
                💳 Credit / Debit
              </button>
            </div>

            <form onSubmit={handleAddPayment}>
              {methodType === 'UPI' ? (
                <div className="input-group">
                  <label className="input-label">Virtual Payment Address (UPI)</label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="e.g. yourname@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <>
                  <div className="input-group">
                    <label className="input-label">Card Number</label>
                    <input
                      type="text"
                      className="input-control"
                      placeholder="4532 •••• •••• 9821"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Name on Card</label>
                    <input
                      type="text"
                      className="input-control"
                      placeholder="Alex Mercer"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div className="input-group">
                      <label className="input-label">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        className="input-control"
                        placeholder="09/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label">CVV</label>
                      <input
                        type="password"
                        className="input-control"
                        placeholder="•••"
                        maxLength="4"
                      />
                    </div>
                  </div>
                </>
              )}

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
                  Link Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
