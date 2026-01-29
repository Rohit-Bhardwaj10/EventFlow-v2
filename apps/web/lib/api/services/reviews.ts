import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Review, CreateReviewInput } from '../types';

export const reviewService = {
  /**
   * Get reviews for a specific event
   */
  async getEventReviews(eventId: string): Promise<Review[]> {
    return apiClient.get<Review[]>(API_ENDPOINTS.EVENT_REVIEWS(eventId));
  },

  /**
   * Get review by ID
   */
  async getById(id: string): Promise<Review> {
    return apiClient.get<Review>(API_ENDPOINTS.REVIEW_BY_ID(id));
  },

  /**
   * Create a new review
   */
  async create(data: CreateReviewInput, token: string): Promise<Review> {
    return apiClient.post<Review>(API_ENDPOINTS.REVIEWS, data, { token });
  },

  /**
   * Update a review
   */
  async update(
    id: string,
    data: Partial<CreateReviewInput>,
    token: string
  ): Promise<Review> {
    return apiClient.patch<Review>(API_ENDPOINTS.REVIEW_BY_ID(id), data, { token });
  },

  /**
   * Delete a review
   */
  async delete(id: string, token: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.REVIEW_BY_ID(id), { token });
  },
};
