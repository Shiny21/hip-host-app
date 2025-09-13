# Host App – Pluggable Micro-Frontend Architecture

![Status](https://img.shields.io/badge/status-active-brightgreen) 
![React](https://img.shields.io/badge/React-18.2.0-blue) 
![TypeScript](https://img.shields.io/badge/TypeScript-5.1.6-blueviolet) 
![Webpack](https://img.shields.io/badge/Webpack-5.88.2-orange) 
![License](https://img.shields.io/badge/license-MIT-lightgrey) 

This project demonstrates a **pluggable micro-frontend architecture** with dynamic runtime loading of multiple micro-frontends (Auth, Booking, Reporting). The host app orchestrates the communication between micro-frontends via a **central event bus**, mimicking a real-world ticket booking system.  

---

## Features

- Dynamically loads micro-frontends via environment variables or remote configuration.
- Real-time event-driven communication between micro-frontends.
- Centralized error handling using `ErrorBoundary`.
- Role-based access control and live analytics dashboards.
- Temporary seat lock to prevent concurrency conflicts in booking.

---

## Micro-Frontends

| Micro-Frontend | Scope       | Modules               | Route            |
|----------------|------------|---------------------|----------------|
| Auth App       | authApp    | Login, UserProfile  | `/auth/login`, `/auth/profile` |
| Booking App    | bookingApp | BookingForm, BookingList | `/booking/form`, `/booking/list` |
| Reporting App  | reportingApp | ReportDashboard    | `/reporting` |

---

## Step-by-Step Documented Flow

### 1. User Authentication and Session Management
- **Action:** User logs in via Auth-App.
- **Event Published:** `userLoggedIn` with `userId` and `role`.
- **Reaction:**  
  - Booking-App activates seat selection and booking forms.  
  - Reporting-App checks user role; admin users see advanced dashboards.

### 2. Real-Time Seat Selection & Concurrency
- **Action:** User selects a seat in Booking-App.
- **Event Published:** `seatSelected` with `matchId` and `seatId`.
- **Reaction:**  
  - Reporting-App updates live seat map.  
  - Seat is temporarily reserved to prevent concurrent selection by others.

### 3. Booking Confirmation & Real-Time Analytics
- **Action:** User confirms booking.
- **Event Published:** `ticketBooked` and `analyticsEvent` with `BOOKING_CONFIRMED`.
- **Reaction:**  
  - Reporting-App updates dashboards and revenue charts in real-time.  
  - Provides live analytics on ticket sales and revenue.

### 4. Error & Failure Handling
- **Action:** Booking fails (payment error, seat conflict, etc.).
- **Event Published:** `bookingFailed` with `errorMessage`.
- **Reaction:**  
  - Booking-App displays user-friendly notification.  
  - Reporting-App logs failures for analysis.

---
