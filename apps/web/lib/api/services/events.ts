import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
  Event,
  CreateEventInput,
  UpdateEventInput,
  PaginatedResponse,
  EventStats,
} from '../types';

export const eventService = {
  /**
   * Get all events with optional filters
   */
  async getAll(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    status?: string;
  }): Promise<PaginatedResponse<Event>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.category) queryParams.set('category', params.category);
    if (params?.search) queryParams.set('search', params.search);
    if (params?.status) queryParams.set('status', params.status);

    const query = queryParams.toString();
    const endpoint = query ? `${API_ENDPOINTS.EVENTS}?${query}` : API_ENDPOINTS.EVENTS;

    return apiClient.get<PaginatedResponse<Event>>(endpoint);
  },

  /**
   * Get event by ID
   */
  async getById(id: string): Promise<Event> {
    return apiClient.get<Event>(API_ENDPOINTS.EVENT_BY_ID(id));
  },

  /**
   * Get event by slug
   */
  async getBySlug(slug: string): Promise<Event> {
    return apiClient.get<Event>(API_ENDPOINTS.EVENT_BY_SLUG(slug));
  },

  /**
   * Create a new event (requires authentication)
   */
  async create(data: CreateEventInput, token: string): Promise<Event> {
    return apiClient.post<Event>(API_ENDPOINTS.EVENTS, data, { token });
  },

  /**
   * Update an event (requires authentication)
   */
  async update(id: string, data: UpdateEventInput, token: string): Promise<Event> {
    return apiClient.patch<Event>(API_ENDPOINTS.EVENT_BY_ID(id), data, { token });
  },

  /**
   * Delete an event (requires authentication)
   */
  async delete(id: string, token: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.EVENT_BY_ID(id), { token });
  },

  /**
   * Get event statistics (requires authentication)
   */
  async getStats(id: string, token: string): Promise<EventStats> {
    return apiClient.get<EventStats>(API_ENDPOINTS.EVENT_STATS(id), { token });
  },
};
