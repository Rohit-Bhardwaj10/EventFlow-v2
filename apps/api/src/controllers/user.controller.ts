import type { Context } from "hono";
import * as userService from "../services/user.service";

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (c: Context) => {
  try {
    const userId = c.get("userId"); // Set by auth middleware
    const user = await userService.getUserById(userId);

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user });
  } catch (error) {
    console.error("Error getting current user:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const user = await userService.getUserById(id);

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user });
  } catch (error) {
    console.error("Error getting user:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

/**
 * Update current user
 */
export const updateCurrentUser = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const body = await c.req.json();

    const user = await userService.updateUser(userId, body);

    return c.json({ user });
  } catch (error) {
    console.error("Error updating user:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};
