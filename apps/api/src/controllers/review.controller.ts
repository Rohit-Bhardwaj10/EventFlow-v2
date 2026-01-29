import type { Context } from "hono";
import * as reviewService from "../services/review.service";

/**
 * GET /api/events/:eventId/reviews - Get all reviews for an event
 */
export const getEventReviews = async (c: Context) => {
  try {
    const eventId = c.req.param("eventId");
    const reviews = await reviewService.getEventReviews(eventId);
    return c.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

/**
 * POST /api/events/:eventId/reviews - Create a review
 */
export const createReview = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const eventId = c.req.param("eventId");
    const body = await c.req.json();

    if (!body.rating) {
      return c.json({ error: "Rating is required" }, 400);
    }

    const review = await reviewService.createReview(eventId, userId, body);
    return c.json({ review }, 201);
  } catch (error: any) {
    console.error("Error creating review:", error);
    if (error.message === "Event not found") {
      return c.json({ error: "Event not found" }, 404);
    }
    if (
      error.message.includes("Rating must be") ||
      error.message.includes("only review events") ||
      error.message.includes("must have attended") ||
      error.message.includes("already reviewed")
    ) {
      return c.json({ error: error.message }, 400);
    }
    throw error;
  }
};

/**
 * PATCH /api/reviews/:id - Update review
 */
export const updateReview = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    const body = await c.req.json();

    const review = await reviewService.updateReview(id, userId, body);
    return c.json({ review });
  } catch (error: any) {
    console.error("Error updating review:", error);
    if (error.message === "Review not found") {
      return c.json({ error: "Review not found" }, 404);
    }
    if (error.message.includes("Unauthorized")) {
      return c.json({ error: error.message }, 403);
    }
    if (error.message.includes("Rating must be")) {
      return c.json({ error: error.message }, 400);
    }
    throw error;
  }
};

/**
 * DELETE /api/reviews/:id - Delete review
 */
export const deleteReview = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    await reviewService.deleteReview(id, userId);
    return c.json({ message: "Review deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting review:", error);
    if (error.message === "Review not found") {
      return c.json({ error: "Review not found" }, 404);
    }
    if (error.message.includes("Unauthorized")) {
      return c.json({ error: error.message }, 403);
    }
    throw error;
  }
};

/**
 * GET /api/events/:eventId/rating - Get event average rating
 */
export const getEventRating = async (c: Context) => {
  try {
    const eventId = c.req.param("eventId");
    const rating = await reviewService.getEventAverageRating(eventId);
    return c.json(rating);
  } catch (error) {
    console.error("Error fetching rating:", error);
    throw error;
  }
};
