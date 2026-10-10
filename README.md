# 🅿️ ParkShare — Smart Peer Parking Network

[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-5551FF?style=for-the-badge)](LICENSE)
[![Status: Production_Ready](https://img.shields.io/badge/Status-Production_Ready-10B981?style=for-the-badge)]()

> **"Parking, without the search."**  
> ParkShare is a decentralized, peer-to-peer parking marketplace web application designed to connect drivers searching for urban parking with property owners who have vacant private driveways, residential bays, or commercial parking slots.

---

## 📑 Table of Contents

1. [Executive Summary](#-executive-summary)
2. [Problem Statement & Market Analysis](#-problem-statement--market-analysis)
3. [The ParkShare Solution](#-the-parkshare-solution)
4. [Complete System Workflow & User Journeys](#-complete-system-workflow--user-journeys)
   - [4.1 The Driver Journey](#41-the-driver-journey)
   - [4.2 The Space Owner (Host) Journey](#42-the-space-owner-host-journey)
5. [In-Depth Feature Catalog](#-in-depth-feature-catalog)
   - [Interactive Leaflet Mapping Engine](#interactive-leaflet-mapping-engine)
   - [Driver Tools & Preferences](#driver-tools--preferences)
   - [Host Finance, Settlements & Reports](#host-finance-settlements--reports)
6. [Design System & UI/UX Blueprint](#-design-system--uiux-blueprint)
   - [Brand Tokens & Palette](#brand-tokens--palette)
   - [Typography Hierarchy](#typography-hierarchy)
   - [Component Engineering & Micro-Interactions](#component-engineering--micro-interactions)
7. [System Architecture & Directory Structure](#-system-architecture--directory-structure)
8. [Data Models & Schema Specifications](#-data-models--schema-specifications)
9. [Installation & Getting Started](#-installation--getting-started)
10. [Walkthrough & Testing Guide](#-walkthrough--testing-guide)
11. [Roadmap & Future Extensions](#-roadmap--future-extensions)
12. [License & Acknowledgments](#-license--acknowledgments)

---

## 📌 Executive Summary

Urban vehicle density has outpaced traditional municipal parking infrastructure. Drivers in major commercial and residential hubs spend an average of **17 minutes** searching for vacant parking bays during peak hours, directly generating carbon emissions and contributing to avoidable gridlock.

Concurrently, a massive inventory of private parking real estate—residential driveways, apartment complex spare bays, institutional lots, and commercial garages—sits empty during off-peak and commuter hours.

**ParkShare** unlocks this dormant urban inventory through an app-first peer-to-peer marketplace:
- **Drivers** gain guaranteed, pre-booked access to secure parking spots with transparent hourly pricing, turn-by-turn map markers, and digital access passes.
- **Space Hosts** transform unused land, driveways, or garage stalls into predictable, passive revenue streams with automated settlements and occupancy reporting.

---

## 🔍 Problem Statement & Market Analysis

| Stakeholder | Pain Point | Direct Consequence | ParkShare Intervention |
| :--- | :--- | :--- | :--- |
| **City Drivers** | Inability to predict parking availability near destinations. | Wasted fuel, time loss, elevated stress, and illegal curb parking. | Real-time map reservation with guaranteed slot reservation ahead of departure. |
| **Private Owners** | No simple mechanism to monetize vacant driveways or garages. | 0% return on valuable private urban real estate. | Zero-setup listing dashboard with price controls and instant payout options. |
| **Urban Transit** | High volume of "cruising" traffic seeking parking bays. | Up to 30% of downtown traffic congestion caused by parking seekers. | Direct navigation to dedicated off-street peer spots. |

---

## 💡 The ParkShare Solution

ParkShare eliminates parking anxiety by shifting the paradigm from **reactive searching** to **proactive reserving**:

```
[Driver Search] ──▶ [Interactive Map / Filter] ──▶ [Slot Selection] ──▶ [Instant Digital Pass]
                                                                                ▲
                                                                                │ Real-time Sync
[Host Onboarding] ──▶ [Listing Creation] ────────▶ [Bay Activation] ───────────┘
```

1. **Decentralized Urban Space Pool:** Turns private real estate into on-demand public parking bays.
2. **Transparent Hourly Rates:** No surge pricing or hidden exit fees; drivers pay exact duration costs.
3. **Verified Access & Security:** Every driver enters a verified license plate, and every listing features detailed gate codes and host instructions.

---

## 🔄 Complete System Workflow & User Journeys

### 4.1 The Driver Journey

```
┌─────────────────┐       ┌────────────────────┐       ┌───────────────────┐
│  Landing Page   │ ────▶ │  Slide-Over Drawer │ ────▶ │ Driver Dashboard  │
│  Minimal Hero   │       │  Sign In / Sign Up │       │ Leaflet Live Map  │
└─────────────────┘       └────────────────────┘       └───────────────────┘
                                                                 │
                                                                 ▼
┌─────────────────┐       ┌────────────────────┐       ┌───────────────────┐
│  Confirmation   │ ◀──── │ Booking Checkout   │ ◀──── │ Parking Details   │
│  Digital Pass   │       │ Schedule & Plate   │       │ Amenities & Guide │
└─────────────────┘       └────────────────────┘       └───────────────────┘
         │
         ▼
┌─────────────────┐       ┌────────────────────┐       ┌───────────────────┐
│   My Bookings   │ ────▶ │   ⭐ Saved Places  │ ────▶ │ 🚗 Vehicle Profile│
│   Pass History  │       │   1-Click Re-book  │       │ & 💳 Express Pay  │
└─────────────────┘       └────────────────────┘       └───────────────────┘
```

1. **Discovery:** Driver lands on the minimal, high-aesthetic landing page.
2. **Authentication:** Clicks **Sign In to App**; the slide-over drawer opens with a role toggle.
3. **Map Exploration:** Explores the interactive Leaflet map; hovers over custom purple price markers (`₹40/hr`, `₹65/hr`).
4. **Inspection:** Selects a spot to inspect vehicle size limits, real photos, amenities (CCTV, EV charging), and gate clearance instructions.
5. **Reservation:** Chooses parking date, arrival time, and departure time. The system calculates exact hours, base rate, and platform fee.
6. **Pass Generation:** Inputs vehicle license plate and confirms booking to receive a digital pass (`BK-XXXX`).
7. **Pass Management:** Views reservation status under **My Bookings**, marks favorite spots under **Saved Places**, and manages plates in **Vehicle Profiles**.

---

### 4.2 The Space Owner (Host) Journey

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  Landing Page    │ ────▶ │ Slide-Over Sign- │ ────▶ │ Host Dashboard   │
│  "List Your Bay" │       │ In / Role: Owner │       │ Metrics & Spaces │
└──────────────────┘       └──────────────────┘       └──────────────────┘
                                                                │
                                                                ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│ Payout Settings  │ ◀──── │ Incoming Bookings│ ◀──── │ Add Parking Form │
│ Bank / Frequency │       │ Driver Passes Log│       │ Publish Listing  │
└──────────────────┘       └──────────────────┘       └──────────────────┘
         │
         ▼
┌──────────────────┐
│ Monthly Reports  │
│ Occupancy & Tax  │
└──────────────────┘
```

1. **Onboarding:** Owner registers as a **Parking Owner** via the multi-step onboarding wizard.
2. **Dashboard Overview:** Displays total listings, active spaces, paused bays, and gross earnings.
3. **Listing Creation:** Fills out the listing form with title, street address, type (Garage, Driveway, Basement), hourly rate (₹/hr), capacity, photo URL, and access instructions.
4. **Spot Control:** Instant toggle to **Pause** or **Activate** listings when private bays are personally needed.
5. **Reservation Tracking:** Monitors incoming driver bookings in real time with arrival windows, driver names, and license plate records.
6. **Financial Settlement:** Accesses **Payout Settings** to configure bank accounts and payout frequencies (**Daily**, **Weekly Friday**, **Monthly**), or views **Monthly Reports** with downloadable GST tax statements.

---

## 🚀 In-Depth Feature Catalog

### Interactive Leaflet Mapping Engine
- **Engine:** Built with `leaflet` and `react-leaflet` integrated directly into the React component lifecycle.
- **Tiles:** Free OpenStreetMap Standard Tiles (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`) eliminating API key restrictions and watermarks.
- **Custom Price Badges:** Dynamic HTML `L.divIcon` markers with hover elevations and active spot color shifts.
- **`MapRecenter` Hook:** Subscribes to spot selection state changes and triggers animated `map.flyTo()` smooth pans.
- **Detailed Popups:** Interactive card overlays featuring spot photo, title, street address, and direct **Inspect** buttons.

### Driver Tools & Preferences
- **⭐ Saved Places (`SavedPlaces.js`):** Bookmarking hub for frequent commuters with quick "Reserve Space Again" shortcuts.
- **🚗 Vehicle Profiles (`VehicleProfiles.js`):** Add, edit, and set primary default vehicles (Sedan, SUV, Hatchback, EV) with plate numbers for automatic gate verification.
- **💳 Payment Methods (`PaymentMethods.js`):** ParkShare Express wallet balance (`₹1,250.00`) with auto-reload, linked UPI VPAs (GPay/PhonePe), and encrypted Credit/Debit card storage.

### Host Finance, Settlements & Reports
- **💰 Payout Settings (`PayoutSettings.js`):**
  - **Settlement Frequency:** Choice between **Daily**, **Weekly (Every Friday)**, or **Monthly (1st of month)** sweeps.
  - **Account Registry:** Multi-bank NEFT/IMPS support with primary beneficiary selection and instant withdrawal capabilities.
- **📄 Monthly Reports (`MonthlyReports.js`):**
  - Occupancy percentage tracking (e.g., 78% occupancy in September 2026).
  - Financial breakdown: Gross revenue minus 10% platform fee equals net host payout.
  - Downloadable monthly GST invoice PDF statements.

---

## 🎨 Design System & UI/UX Blueprint

ParkShare was engineered from a custom design specification to deliver an app-like experience rather than a generic website template.

### Brand Tokens & Palette

| Token Name | Value | Usage |
| :--- | :--- | :--- |
| `--primary` | `#5551FF` | Main purple-indigo brand identity, buttons, active pins |
| `--primary-hover` | `#433DFF` | Button hover and pressed feedback |
| `--primary-light` | `#EEEDFF` | Subtle brand chips, active sidebar item backgrounds |
| `--primary-glow` | `rgba(85, 81, 255, 0.35)` | Atmospheric card drop-shadows and focus rings |
| `--bg-soft` | `#F8F9FE` | Clean lavender-tinted background canvas |
| `--bg-card` | `#FFFFFF` | Elevated card and modal surfaces |
| `--text-dark` | `#0F1226` | Deep midnight charcoal for high-contrast titles |
| `--text-secondary`| `#4E5375` | Slate body copy for readability |
| `--text-muted` | `#8086A8` | Captions, labels, timestamps |
| `--accent-emerald`| `#10B981` | Success states, active status badges, positive payouts |

### Typography Hierarchy
- **Display & Headings:** `Space Grotesk` (Weights: 600, 700, 800) — technical, high-impact numbers and headlines.
- **Interface & Body:** `Plus Jakarta Sans` (Weights: 400, 500, 600, 700) — clean geometric typography optimized for UI legibility.

### Component Engineering & Micro-Interactions
- **Slide-Over Sidebar Drawer:** Replaces multi-page redirects with a right-hand sliding panel (`translateX(100%)` to `0`) with backdrop blur (`blur(6px)`).
- **3D Smartphone Device Mockup:** Realistic hardware bezel with speaker notch, internal mini-map with Market Street vector grid, and floating status widgets (`floatUp` and `floatDown` animations).
- **Glassmorphism:** Navigation headers and floating metric chips utilize backdrop filters (`backdrop-filter: blur(12px)`).

---

## 📂 System Architecture & Directory Structure

```
d:\park-share\
├── public\
│   ├── favicon.ico               # Application favicon
│   ├── index.html                # App shell with Leaflet CSS link
│   └── manifest.json             # Web app manifest
├── src\
│   ├── components\
│   │   ├── Navbar.js             # Role-aware sticky header with profile chip
│   │   └── ParkingLeafletMap.js  # Leaflet map with custom DOM price markers
│   ├── context\
│   │   └── ParkContext.js        # Global React Context provider & state
│   ├── data\
│   │   └── mockData.js           # Verified parking spots and sample bookings
│   ├── pages\
│   │   ├── Landing.js            # Two-column hero & slide-over auth drawer
│   │   ├── SignUp.js             # Multi-step adaptive onboarding wizard
│   │   ├── Login.js              # Dedicated sign-in credentials screen
│   │   ├── DriverDashboard.js    # Search hub, Leaflet map, filters & deck
│   │   ├── ParkingDetails.js     # Space inspection, host rating & features
│   │   ├── Booking.js            # Duration calculation, plate entry & pass
│   │   ├── MyBookings.js         # Driver digital pass table & receipts
│   │   ├── SavedPlaces.js        # Favorite spots bookmarker
│   │   ├── VehicleProfiles.js    # Plate management & vehicle classes
│   │   ├── PaymentMethods.js     # Express wallet, UPI & Card settings
│   │   ├── OwnerDashboard.js     # Host metrics & spaces management table
│   │   ├── AddParking.js         # New space listing form
│   │   ├── OwnerBookings.js      # Incoming reservations tracker
│   │   ├── PayoutSettings.js     # Bank account & settlement schedules
│   │   └── MonthlyReports.js     # Historical revenue & tax statements
│   ├── App.js                    # View routing engine
│   ├── index.css                 # Master CSS stylesheet (tokens, layout, map)
│   └── index.js                  # React DOM bootstrap
├── package.json                  # Dependencies (React 19, Leaflet, React-Leaflet)
└── README.md                     # Comprehensive project documentation
```

---

## 🗄️ Data Models & Schema Specifications

### Parking Spot Entity (`Spot`)
```typescript
interface ParkingSpot {
  id: string;               // Unique spot identifier ('spot-1')
  title: string;            // Descriptive listing title
  ownerId: string;          // Host reference ID
  ownerName: string;        // Verified host full name
  ownerPhone: string;       // Host contact number
  address: string;          // Full street address
  city: string;             // Neighborhood / District
  lat: number;              // Geolocation Latitude (e.g. 37.7749)
  lng: number;              // Geolocation Longitude (e.g. -122.4194)
  pricePerHour: number;     // Normalized hourly rate
  type: string;             // 'Covered / Garage' | 'Driveway' | 'Basement' | 'Open Paved Lot'
  vehicleSize: string;      // 'SUV / Sedan' | 'Sedan / Hatchback' | 'All Vehicle Types'
  amenities: string[];      // ['CCTV Surveillance', 'EV Charging', 'Gated Access']
  image: string;            // High-resolution photography URL
  description: string;      // Space overview & access context
  instructions: string;     // Gate entry instructions & security PIN
  rating: number;           // User review rating (1.0 - 5.0)
  reviewsCount: number;     // Total completed review count
  isAvailable: boolean;     // Real-time slot availability status
}
```

### Reservation Pass Entity (`Booking`)
```typescript
interface BookingPass {
  id: string;               // Unique reservation pass reference ('BK-1082')
  spotId: string;           // Target parking spot ID
  spotTitle: string;        // Name of reserved space
  address: string;          // Street location
  driverId: string;         // Authenticated driver ID
  driverName: string;       // Driver full name
  driverEmail: string;      // Driver notification email
  ownerName: string;        // Host name
  date: string;             // Reservation calendar date ('YYYY-MM-DD')
  startTime: string;        // Arrival window ('HH:MM')
  endTime: string;          // Departure window ('HH:MM')
  durationHours: number;    // Computed parking duration
  totalPrice: number;       // Final charged amount (base price + platform fee)
  vehicleNumber: string;    // License plate registered for gate access
  status: string;           // 'Confirmed' | 'Completed' | 'Cancelled'
  createdAt: string;        // ISO 8601 creation timestamp
}
```

---

## 💻 Installation & Getting Started

### Prerequisites
- **Node.js**: `v16.x` or higher
- **npm**: `v8.x` or higher

### Step-by-Step Setup

1. **Open your terminal and navigate to the project root:**
   ```bash
   cd d:\park-share
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```
   *Note: This installs React 19, Leaflet, and react-leaflet.*

3. **Start the local development server:**
   ```bash
   npm start
   ```

4. **Access the application:**
   The development server will automatically launch at:
   ```
   http://localhost:3000
   ```
   *(or `http://localhost:56855` if running inside a containerized sandbox).*

---

## 🧪 Walkthrough & Testing Guide

### Scenario A: Testing the Driver Workflow
1. Open `http://localhost:3000`. You will see the two-column **ParkShare Landing Page**.
2. Click **Sign In to App** to open the slide-over drawer.
3. Select **🚗 Driver**, enter any email (e.g., `alex@example.com`), and click **Sign In**.
4. You arrive at the **Driver Dashboard**:
   - Inspect the **Leaflet map**: drag, zoom, and click the purple price pins (`₹40/hr`, `₹55/hr`).
   - Use the **search bar** to filter by neighborhood.
   - Switch between **Split View**, **List View**, and **Map View**.
5. Click on **Downtown Central Tower** to view space details.
6. Click **Proceed to Reservation →**, pick your times, enter your vehicle plate number (e.g., `MH 02 AB 1234`), and confirm.
7. Receive your digital confirmation pass (`BK-XXXX`).
8. Use the sidebar to explore **⭐ Saved Places**, **🚗 Vehicle Profiles**, and **💳 Payment Methods**.

### Scenario B: Testing the Host (Owner) Workflow
1. Click **Sign Out** in the top navigation bar.
2. Click **Sign In to App** on the landing page, toggle the role to **🅿️ Space Owner**, and sign in.
3. You arrive at the **Host Dashboard**:
   - Review live metrics (Total Spaces, Active bays, Revenue).
   - In the spaces table, toggle a space between **● Available** and **○ Paused**.
4. Click **+ Add Space** to test the space publishing form.
5. In the sidebar:
   - Click **📬 Incoming Bookings** to review incoming reservations and license plate records.
   - Click **💰 Payout Settings** to test settlement schedules (**Daily**, **Weekly**, **Monthly**) and bank accounts.
   - Click **📄 Monthly Reports** to view occupancy rates and download GST invoices.

---

## 🗺️ Roadmap & Future Extensions

- [ ] **Backend Integration:** RESTful / GraphQL API implementation using Node.js & Express / NestJS.
- [ ] **Database Persistence:** PostgreSQL with PostGIS extension for spatial queries (finding spots within radius `R` of coordinate `[lat, lng]`).
- [ ] **Real Payment Gateway:** Integration with Razorpay / Stripe for automated split payouts between driver, platform, and host.
- [ ] **IoT Hardware Integration:** Webhook integration with smart automated boom barriers and OCR license plate recognition cameras.
- [ ] **Mobile Application:** React Native / Flutter cross-platform companion mobile app for turn-by-turn driving directions to parking bays.

---

## 📄 License & Acknowledgments

Distributed under the **MIT License**. See `LICENSE` for more information.

- **Map Tiles:** © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.
- **Mapping Library:** [Leaflet](https://leafletjs.com/) and [react-leaflet](https://react-leaflet.js.org/).
- **Typography:** Google Fonts ([Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)).

---
*Developed for ParkShare — Smart Peer Parking Network.*
