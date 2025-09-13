export const getRemotes = () => [
  {
    name: 'user-login',
    url: process.env.REACT_APP_AUTH_URL!,
    scope: 'authApp',
    module: 'Login',
    route: '/auth/login',
  },
  {
    name: 'user-profile',
    url: process.env.REACT_APP_AUTH_URL!,
    scope: 'authApp',
    module: 'UserProfile',
    route: '/auth/profile',
  },
  {
    name: 'booking-form',
    url: process.env.REACT_APP_BOOKING_URL!,
    scope: 'bookingApp',
    module: 'BookingForm',
    route: '/booking/form',
  },
  {
    name: 'booking-list',
    url: process.env.REACT_APP_BOOKING_URL!,
    scope: 'bookingApp',
    module: 'BookingList',
    route: '/booking/list',
  },
  {
    name: 'reporting',
    url: process.env.REACT_APP_REPORTING_URL!,
    scope: 'reportingApp',
    module: 'ReportDashboard',
    route: '/reporting',
  },
];
