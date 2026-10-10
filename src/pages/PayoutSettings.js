import React, { useState } from 'react';
import { usePark } from '../context/ParkContext';

export default function PayoutSettings() {
  const { setCurrentPage } = usePark();

  const [payoutAccounts, setPayoutAccounts] = useState([
    {
      id: 'acc-1',
      type: 'BANK',
      bankName: 'State Bank of India (SBI)',
      accountNumber: '•••• •••• 5642',
      ifsc: 'SBIN0001234',
      beneficiary: 'Marcus Vance',
      isPrimary: true
    },
    {
      id: 'acc-2',
      type: 'UPI',
      bankName: 'UPI Auto-Transfer',
      accountNumber: 'marcus.vance@upi',
      ifsc: 'Instant settlement',
      beneficiary: 'Marcus Vance',
      isPrimary: false
    }
  ]);

  const [payoutSchedule, setPayoutSchedule] = useState('weekly'); // 'daily' | 'weekly' | 'monthly'
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBank, setNewBank] = useState('');
  const [newAcc, setNewAcc] = useState('');
  const [newIfsc, setNewIfsc] = useState('');

  const handleAddAccount = (e) => {
    e.preventDefault();
    if (!newBank || !newAcc) return alert('Please enter bank details');

    setPayoutAccounts([
      ...payoutAccounts,
      {
        id: 'acc-' + Date.now(),
        type: 'BANK',
        bankName: newBank,
        accountNumber: '•••• •••• ' + newAcc.slice(-4),
        ifsc: newIfsc.toUpperCase(),
        beneficiary: 'Marcus Vance',
        isPrimary: false
      }
    ]);

    setShowAddModal(false);
    setNewBank('');
    setNewAcc('');
    setNewIfsc('');
  };

  const setPrimaryAccount = (id) => {
    setPayoutAccounts(payoutAccounts.map((a) => ({ ...a, isPrimary: a.id === id })));
  };

  return (
    <div className="dashboard-main-viewport" style={{ maxWidth: 900 }}>
      <button
        className="link-btn"
        style={{ marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        onClick={() => setCurrentPage('owner-dashboard')}
      >
        ← Back to Owner Dashboard
      </button>

      <div className="dash-topbar">
        <div>
          <h1 className="dash-welcome-title">💰 Host Payout Settings</h1>
          <p className="dash-welcome-sub">
            Manage your recipient bank accounts and automatic earning transfer schedules.
          </p>
        </div>

        <button
          className="btn-primary-action"
          style={{ width: 'auto', padding: '0 24px' }}
          onClick={() => setShowAddModal(true)}
        >
          + Add Payout Account
        </button>
      </div>

      {/* Payout Summary Widget */}
      <div
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          borderRadius: 24,
          padding: '28px 32px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
          boxShadow: '0 12px 30px rgba(16, 185, 129, 0.25)'
        }}
      >
        <div>
          <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: '#D1FAE5', fontWeight: 700, letterSpacing: '0.8px' }}>
            Ready for Next Settlement
          </span>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '2.4rem', fontWeight: 800, marginTop: 4 }}>
            ₹3,480.00
          </div>
          <div style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 600, marginTop: 2 }}>
            Next transfer scheduled on: <strong>Friday, 16 Oct 2026</strong>
          </div>
        </div>

        <button
          className="btn-outline-action"
          style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.4)', height: 44 }}
          onClick={() => alert('Instant withdrawal transfer initiated to primary bank.')}
        >
          Instant Payout Now
        </button>
      </div>

      {/* Payout Schedule Choice */}
      <div style={{ background: '#FFFFFF', padding: 24, borderRadius: 20, border: '1.5px solid #E3E6F4', marginBottom: 28 }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#12142B', marginBottom: 6 }}>
          Settlement Frequency
        </h3>
        <p style={{ color: '#8086A8', fontSize: '0.88rem', marginBottom: 18 }}>
          Choose when earnings from your parking reservations are swept to your bank.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {['daily', 'weekly', 'monthly'].map((freq) => (
            <button
              key={freq}
              type="button"
              className={`role-chip-toggle ${payoutSchedule === freq ? 'selected' : ''}`}
              onClick={() => setPayoutSchedule(freq)}
              style={{ textTransform: 'capitalize' }}
            >
              {freq === 'daily' && '⚡ Daily Payout'}
              {freq === 'weekly' && '📅 Weekly (Every Friday)'}
              {freq === 'monthly' && '🗓️ Monthly (1st of month)'}
            </button>
          ))}
        </div>
      </div>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#12142B', marginBottom: 16 }}>
        Linked Bank Accounts & UPI
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {payoutAccounts.map((acc) => (
          <div
            key={acc.id}
            style={{
              background: '#FFFFFF',
              borderRadius: 18,
              padding: '22px 26px',
              border: acc.isPrimary ? '2px solid #10B981' : '1.5px solid #E3E6F4',
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
                  background: '#ECFDF5',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem'
                }}
              >
                🏦
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#12142B' }}>
                    {acc.bankName}
                  </h4>
                  {acc.isPrimary && (
                    <span style={{ background: '#ECFDF5', color: '#10B981', padding: '3px 10px', borderRadius: 20, fontSize: '0.74rem', fontWeight: 800 }}>
                      PRIMARY
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.88rem', color: '#8086A8', marginTop: 3 }}>
                  Account: <strong>{acc.accountNumber}</strong> • IFSC: {acc.ifsc}
                </div>
              </div>
            </div>

            {!acc.isPrimary && (
              <button
                className="btn-outline-action"
                style={{ height: 38, fontSize: '0.84rem' }}
                onClick={() => setPrimaryAccount(acc.id)}
              >
                Set as Primary
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Account Modal */}
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
              Add Bank Account
            </h2>
            <p style={{ color: '#8086A8', fontSize: '0.9rem', marginBottom: 20 }}>
              Direct NEFT / IMPS bank account linking for host revenue.
            </p>

            <form onSubmit={handleAddAccount}>
              <div className="input-group">
                <label className="input-label">Bank Name</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="e.g. HDFC Bank, ICICI Bank"
                  value={newBank}
                  onChange={(e) => setNewBank(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Account Number</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Enter full account number"
                  value={newAcc}
                  onChange={(e) => setNewAcc(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">IFSC Code</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="e.g. HDFC0001234"
                  value={newIfsc}
                  onChange={(e) => setNewIfsc(e.target.value)}
                  required
                />
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
                  Link Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
