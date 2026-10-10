import React from 'react';
import { ParkProvider, usePark } from './context/ParkContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import DriverDashboard from './pages/DriverDashboard';
import ParkingDetails from './pages/ParkingDetails';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import OwnerDashboard from './pages/OwnerDashboard';
import AddParking from './pages/AddParking';
import OwnerBookings from './pages/OwnerBookings';
import SavedPlaces from './pages/SavedPlaces';
import VehicleProfiles from './pages/VehicleProfiles';
import PaymentMethods from './pages/PaymentMethods';
import PayoutSettings from './pages/PayoutSettings';
import MonthlyReports from './pages/MonthlyReports';

function MainRouter() {
  const { currentPage } = usePark();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing />;
      case 'signup':
        return <SignUp />;
      case 'login':
        return <Login />;
      case 'driver-dashboard':
        return <DriverDashboard />;
      case 'parking-details':
        return <ParkingDetails />;
      case 'booking':
        return <Booking />;
      case 'my-bookings':
        return <MyBookings />;
      case 'saved-places':
        return <SavedPlaces />;
      case 'vehicle-profiles':
        return <VehicleProfiles />;
      case 'payment-methods':
        return <PaymentMethods />;
      case 'owner-dashboard':
        return <OwnerDashboard />;
      case 'add-parking':
        return <AddParking />;
      case 'owner-bookings':
        return <OwnerBookings />;
      case 'payout-settings':
        return <PayoutSettings />;
      case 'monthly-reports':
        return <MonthlyReports />;
      default:
        return <Landing />;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <main>{renderCurrentPage()}</main>
    </div>
  );
}

function App() {
  return (
    <ParkProvider>
      <MainRouter />
    </ParkProvider>
  );
}

export default App;
