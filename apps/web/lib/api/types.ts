// Event Types
export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  capacity: number;
  price: number;
  currency: string;
  imageUrl?: string;
  organizerId: string;
  organizer?: User;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventInput {
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  capacity: number;
  price: number;
  currency?: string;
  imageUrl?: string;
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  status?: 'draft' | 'published' | 'cancelled' | 'completed';
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'organizer' | 'admin';
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserInput {
  name?: string;
  avatar?: string;
  bio?: string;
}

// Registration Types
export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'attended';
  ticketType: string;
  quantity: number;
  totalAmount: number;
  event?: Event;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRegistrationInput {
  eventId: string;
  ticketType: string;
  quantity: number;
}

// Ticket Types
export interface Ticket {
  id: string;
  registrationId: string;
  qrCode: string;
  status: 'valid' | 'used' | 'cancelled';
  registration?: Registration;
  createdAt: string;
  updatedAt: string;
}

// Review Types
export interface Review {
  id: string;
  eventId: string;
  userId: string;
  rating: number;
  comment?: string;
  event?: Event;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewInput {
  eventId: string;
  rating: number;
  comment?: string;
}

// Post Types
export interface Post {
  id: string;
  eventId: string;
  userId: string;
  content: string;
  imageUrl?: string;
  event?: Event;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  eventId: string;
  content: string;
  imageUrl?: string;
}

// Auth Types
export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Event Stats
export interface EventStats {
  totalRegistrations: number;
  totalRevenue: number;
  attendanceRate: number;
  averageRating: number;
  totalReviews: number;
}
