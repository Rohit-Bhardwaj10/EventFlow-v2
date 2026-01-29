import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { LoginInput, RegisterInput, AuthResponse, User } from '../types';

export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginInput): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH_LOGIN, credentials);
  },

  /**
   * Register new user
   */
  async register(data: RegisterInput): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH_REGISTER, data);
  },

  /**
   * Logout user
   */
  async logout(token: string): Promise<void> {
    return apiClient.post<void>(API_ENDPOINTS.AUTH_LOGOUT, {}, { token });
  },

  /**
   * Get current user
   */
  async getCurrentUser(token: string): Promise<User> {
    return apiClient.get<User>(API_ENDPOINTS.AUTH_ME, { token });
  },
};
