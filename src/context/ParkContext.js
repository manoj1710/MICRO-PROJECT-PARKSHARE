import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PARKING_SPOTS, INITIAL_BOOKINGS } from '../data/mockData';

const ParkContext = createContext();

export function ParkProvider({ children }) {
  // Navigation state: starts on 'landing'
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedSpotId, setSelectedSpotId] = useState(null);
  
  // Pending booking data for checkout/confirmation step
  const [pendingBooking, setPendingBooking] = useState(null);

  // Authenticated user
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('parkshare_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Spots state
  const [spots, setSpots] = useState(() => {
    const saved = localStorage.getItem('parkshare_spots');
    return saved ? JSON.parse(saved) : INITIAL_PARKING_SPOTS;
  });

  // Bookings state
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('parkshare_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('parkshare_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('parkshare_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('parkshare_spots', JSON.stringify(spots));
  }, [spots]);

  useEffect(() => {
    localStorage.setItem('parkshare_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Actions
  const login = (email, password, roleHint) => {
    // Simulated authentication
    const userRole = roleHint || (email.toLowerCase().includes('owner') ? 'owner' : 'driver');
    const user = {
      id: userRole === 'owner' ? 'owner-1' : 'driver-1',
      name: userRole === 'owner' ? 'Marcus Vance' : 'Alex Mercer',
      email: email,
      phone: userRole === 'owner' ? '+1 (555) 234-8901' : '+1 (555) 872-1190',
      role: userRole
    };
    setCurrentUser(user);
    if (user.role === 'owner') {
      setCurrentPage('owner-dashboard');
    } else {
      setCurrentPage('driver-dashboard');
    }
  };

  const signup = (userData) => {
    const newUser = {
      id: 'usr-' + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role // 'driver' or 'owner'
    };
    setCurrentUser(newUser);
    if (newUser.role === 'owner') {
      setCurrentPage('owner-dashboard');
    } else {
      setCurrentPage('driver-dashboard');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
    setSelectedSpotId(null);
    setPendingBooking(null);
  };

  const addSpot = (newSpotData) => {
    const newSpot = {
      ...newSpotData,
      id: 'spot-' + Date.now(),
      ownerId: currentUser?.id || 'owner-1',
      ownerName: currentUser?.name || 'Owner',
      ownerPhone: currentUser?.phone || '+1 (555) 000-0000',
      rating: 5.0,
      reviewsCount: 0,
      isAvailable: true
    };
    setSpots((prev) => [newSpot, ...prev]);
  };

  const toggleSpotAvailability = (id) => {
    setSpots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isAvailable: !s.isAvailable } : s))
    );
  };

  const createBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: 'BK-' + Math.floor(1000 + Math.random() * 9000),
      driverId: currentUser?.id || 'guest',
      driverName: currentUser?.name || 'Driver',
      driverEmail: currentUser?.email || 'driver@example.com',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  return (
    <ParkContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        currentUser,
        setCurrentUser,
        spots,
        bookings,
        selectedSpotId,
        setSelectedSpotId,
        pendingBooking,
        setPendingBooking,
        login,
        signup,
        logout,
        addSpot,
        toggleSpotAvailability,
        createBooking
      }}
    >
      {children}
    </ParkContext.Provider>
  );
}

export function usePark() {
  return useContext(ParkContext);
}
