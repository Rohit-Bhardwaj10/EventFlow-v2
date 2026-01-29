import type { Context } from "hono";
import * as favoriteService from "../services/favorite.service";

/**
 * GET /api/users/me/favorites - Get user's favorite events
 */
export const getUserFavorites = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const favorites = await favoriteService.getUserFavorites(userId);
    return c.json({ favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

/**
 * POST /api/events/:eventId/favorite - Add event to favorites
 */
export const addToFavorites = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const eventId = c.req.param("eventId");
    const favorite = await favoriteService.addToFavorites(eventId, userId);

    return c.json({ favorite }, 201);
  } catch (error: any) {
    console.error("Error adding to favorites:", error);
    if (error.message === "Event not found") {
      return c.json({ error: "Event not found" }, 404);
    }
    if (error.message.includes("already in your favorites")) {
      return c.json({ error: error.message }, 400);
    }
    throw error;
  }
};

/**
 * DELETE /api/events/:eventId/favorite - Remove event from favorites
 */
export const removeFromFavorites = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const eventId = c.req.param("eventId");
    await favoriteService.removeFromFavorites(eventId, userId);

    return c.json({ message: "Removed from favorites" });
  } catch (error: any) {
    console.error("Error removing from favorites:", error);
    if (error.message.includes("not in your favorites")) {
      return c.json({ error: error.message }, 404);
    }
    throw error;
  }
};

/**
 * POST /api/events/:eventId/toggle-favorite - Toggle favorite status
 */
export const toggleFavorite = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const eventId = c.req.param("eventId");
    const result = await favoriteService.toggleFavorite(eventId, userId);

    return c.json(result);
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error;
  }
};

/**
 * GET /api/events/:eventId/is-favorited - Check if event is favorited
 */
export const isFavorited = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ isFavorited: false });
    }

    const eventId = c.req.param("eventId");
    const favorited = await favoriteService.isFavorited(eventId, userId);

    return c.json({ isFavorited: favorited });
  } catch (error) {
    console.error("Error checking favorite status:", error);
    throw error;
  }
};
