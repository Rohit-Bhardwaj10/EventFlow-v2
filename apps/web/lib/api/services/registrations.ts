import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
  Registration,
  CreateRegistrationInput,
  PaginatedResponse,
} from '../types';

export const registrationService = {
  /**
   * Get all registrations for the current user
   */
  async getUserRegistrations(token: string): Promise<Registration[]> {
    return apiClient.get<Registration[]>(API_ENDPOINTS.USER_REGISTRATIONS, { token });
  },

  /**
   * Get registrations for a specific event
   */
  async getEventRegistrations(eventId: string, token: string): Promise<Registration[]> {
    return apiClient.get<Registration[]>(API_ENDPOINTS.EVENT_REGISTRATIONS(eventId), { token });
  },

  /**
   * Get registration by ID
   */
  async getById(id: string, token: string): Promise<Registration> {
    return apiClient.get<Registration>(API_ENDPOINTS.REGISTRATION_BY_ID(id), { token });
  },

  /**
   * Create a new registration
   */
  async create(data: CreateRegistrationInput, token: string): Promise<Registration> {
    return apiClient.post<Registration>(API_ENDPOINTS.REGISTRATIONS, data, { token });
  },

  /**
   * Cancel a registration
   */
  async cancel(id: string, token: string): Promise<Registration> {
    return apiClient.patch<Registration>(
      API_ENDPOINTS.REGISTRATION_BY_ID(id),
      { status: 'cancelled' },
      { token }
    );
  },
};
