import React, { useState } from 'react';
import { usePark } from '../context/ParkContext';

export default function SignUp() {
  const { signup, setCurrentPage } = usePark();

  // Wizard state: Step 1 (Role Choice), Step 2 (Role Specific Questions), Step 3 (Personal Details & Password)
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('driver'); // 'driver' | 'owner'

  // Driver specifics
  const [vehicleType, setVehicleType] = useState('Sedan');
  const [parkingDurationType, setParkingDurationType] = useState('Hourly');
  const [coveredPreference, setCoveredPreference] = useState(true);

  // Owner specifics
  const [propertyType, setPropertyType] = useState('Residential Driveway');
  const [supportedVehicles, setSupportedVehicles] = useState('All Vehicle Types');
  const [hourlyExpectation, setHourlyExpectation] = useState('40');

  // Personal details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleNextStep = () => {
    if (step === 2) {
      setStep(3);
    } else {
      setStep(step + 1);
    }
  };

  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      alert('Please fill out all required personal fields.');
      return;
    }

    signup({
      name: fullName,
      email,
      phone,
      role,
      preferences: role === 'driver' 
        ? { vehicleType, parkingDurationType, coveredPreference }
        : { propertyType, supportedVehicles, hourlyExpectation }
    });
  };

  return (
    <div className="wizard-page">
      <div className="wizard-card">
        {/* Stepper Header */}
        <div className="wizard-stepper-header">
          <div className="stepper-steps-indicator">
            <div className="stepper-bar-bg" />
            <div
              className="stepper-bar-fill"
              style={{
                width: step === 1 ? '0%' : step === 2 ? '40%' : '80%'
              }}
            />

            <div className={`step-node ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-node ${step >= 2 ? (step === 2 ? 'active' : 'completed') : ''}`}>2</div>
            <div className={`step-node ${step === 3 ? 'active' : ''}`}>3</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#5255EB', textTransform: 'uppercase' }}>
              Step {step} of 3
            </span>
            <button
              className="link-btn"
              onClick={() => setCurrentPage('landing')}
              style={{ fontSize: '0.85rem' }}
            >
              Cancel & Exit
            </button>
          </div>
        </div>

        {/* ================= STEP 1: CHOOSE ACCOUNT TYPE ================= */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#12142B', marginBottom: 6 }}>
              Choose your account type
            </h2>
            <p style={{ color: '#757999', fontSize: '0.94rem' }}>
              Select whether you need parking spaces or have parking to share.
            </p>

            <div className="role-cards-grid">
              <div
                className={`role-card-select ${role === 'driver' ? 'selected' : ''}`}
                onClick={() => setRole('driver')}
              >
                <div className="role-icon-box">🚗</div>
                <div className="role-card-title">I'm a Driver</div>
                <div className="role-card-desc">
                  I need guaranteed, stress-free parking spaces in high-demand areas.
                </div>
              </div>

              <div
                className={`role-card-select ${role === 'owner' ? 'selected' : ''}`}
                onClick={() => setRole('owner')}
              >
                <div className="role-icon-box">🅿️</div>
                <div className="role-card-title">I'm a Parking Owner</div>
                <div className="role-card-desc">
                  I have an unused driveway, garage, or private bay to monetize.
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary-action"
              onClick={() => setStep(2)}
            >
              Continue to Preferences →
            </button>
          </div>
        )}

        {/* ================= STEP 2: ROLE-SPECIFIC QUESTIONS ================= */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#12142B', marginBottom: 6 }}>
              {role === 'driver' ? 'Driver Setup' : 'Parking Space Profile'}
            </h2>
            <p style={{ color: '#757999', fontSize: '0.94rem', marginBottom: 24 }}>
              Customize your experience with tailored defaults.
            </p>

            {role === 'driver' ? (
              <>
                <div className="input-group">
                  <label className="input-label">What type of vehicle do you drive?</label>
                  <select
                    className="input-control"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <option value="Sedan">Compact / Sedan</option>
                    <option value="SUV">SUV / Crossover</option>
                    <option value="Electric Vehicle">Electric Vehicle (Needs EV Charging)</option>
                    <option value="Motorcycle">Motorcycle / Two-Wheeler</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Typical parking duration need</label>
                  <select
                    className="input-control"
                    value={parkingDurationType}
                    onChange={(e) => setParkingDurationType(e.target.value)}
                  >
                    <option value="Hourly">Hourly / Quick visits</option>
                    <option value="Daily">Daily Commuter (Full day)</option>
                    <option value="Monthly">Monthly Recurring Pass</option>
                  </select>
                </div>

                <div className="checkbox-row" style={{ margin: '14px 0 28px' }}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={coveredPreference}
                      onChange={(e) => setCoveredPreference(e.target.checked)}
                    />
                    I prefer covered / shaded parking spots
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="input-group">
                  <label className="input-label">Parking space category</label>
                  <select
                    className="input-control"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="Residential Driveway">Residential Driveway</option>
                    <option value="Covered Garage / Bay">Covered Garage / Bay</option>
                    <option value="Commercial Basement">Commercial Basement</option>
                    <option value="Open Gated Compound">Open Gated Compound</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Permitted vehicle sizes</label>
                  <select
                    className="input-control"
                    value={supportedVehicles}
                    onChange={(e) => setSupportedVehicles(e.target.value)}
                  >
                    <option value="All Vehicle Types">All Vehicle Types</option>
                    <option value="Sedan and Hatchback only">Sedan and Hatchback only</option>
                    <option value="Compact SUV / Sedan">Compact SUV / Sedan</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Expected target rate (₹ / hour)</label>
                  <input
                    type="number"
                    className="input-control"
                    value={hourlyExpectation}
                    onChange={(e) => setHourlyExpectation(e.target.value)}
                  />
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="button"
                className="btn-outline-action"
                style={{ flex: 1 }}
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button
                type="button"
                className="btn-primary-action"
                style={{ flex: 2 }}
                onClick={handleNextStep}
              >
                Continue to Account →
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: PERSONAL DETAILS & FINISH ================= */}
        {step === 3 && (
          <form onSubmit={handleCompleteRegistration}>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#12142B', marginBottom: 6 }}>
              Complete your profile
            </h2>
            <p style={{ color: '#757999', fontSize: '0.94rem', marginBottom: 24 }}>
              Register your credentials to start using ParkShare.
            </p>

            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                className="input-control"
                placeholder="e.g. Alex Mercer"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                className="input-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Contact Phone</label>
              <input
                type="tel"
                className="input-control"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Create Password</label>
              <div className="text-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-control"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button
                type="button"
                className="btn-outline-action"
                style={{ flex: 1 }}
                onClick={() => setStep(2)}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="btn-primary-action"
                style={{ flex: 2 }}
              >
                Create Account
              </button>
            </div>
          </form>
        )}

        {/* Existing account footer */}
        <div style={{ marginTop: 24, textAlign: 'center', fontSize: '0.9rem', color: '#757999' }}>
          Already have a ParkShare account?{' '}
          <button
            className="link-btn"
            onClick={() => setCurrentPage('landing')}
            style={{ fontWeight: 700 }}
          >
            Sign In here
          </button>
        </div>
      </div>
    </div>
  );
}
