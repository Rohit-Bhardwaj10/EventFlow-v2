// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// API Endpoints
export const API_ENDPOINTS = {
  // Events
  EVENTS: '/api/events',
  EVENT_BY_ID: (id: string) => `/api/events/${id}`,
  EVENT_BY_SLUG: (slug: string) => `/api/events/slug/${slug}`,
  EVENT_STATS: (id: string) => `/api/events/${id}/stats`,
  
  // Users
  USERS: '/api/users',
  USER_BY_ID: (id: string) => `/api/users/${id}`,
  USER_PROFILE: '/api/users/profile',
  
  // Registrations
  REGISTRATIONS: '/api/registrations',
  REGISTRATION_BY_ID: (id: string) => `/api/registrations/${id}`,
  USER_REGISTRATIONS: '/api/registrations/user',
  EVENT_REGISTRATIONS: (eventId: string) => `/api/registrations/event/${eventId}`,
  
  // Tickets
  TICKETS: '/api/tickets',
  TICKET_BY_ID: (id: string) => `/api/tickets/${id}`,
  VERIFY_TICKET: '/api/tickets/verify',
  
  // Reviews
  REVIEWS: '/api/reviews',
  REVIEW_BY_ID: (id: string) => `/api/reviews/${id}`,
  EVENT_REVIEWS: (eventId: string) => `/api/reviews/event/${eventId}`,
  
  // Posts
  POSTS: '/api/posts',
  POST_BY_ID: (id: string) => `/api/posts/${id}`,
  EVENT_POSTS: (eventId: string) => `/api/posts/event/${eventId}`,
  
  // Auth
  AUTH_LOGIN: '/api/auth/login',
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_ME: '/api/auth/me',
} as const;
