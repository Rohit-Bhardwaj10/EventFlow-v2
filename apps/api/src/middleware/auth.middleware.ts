import type { Context, Next } from "hono";
import { auth } from "../../lib/auth";

/**
 * Authentication middleware
 * Checks if user is authenticated and sets userId in context
 */
export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session || !session.user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Set user info in context for use in controllers
    c.set("userId", session.user.id);
    c.set("user", session.user);

    await next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return c.json({ error: "Unauthorized" }, 401);
  }
};

/**
 * Optional auth middleware
 * Doesn't fail if no session, just sets user if available
 */
export const optionalAuthMiddleware = async (c: Context, next: Next) => {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (session && session.user) {
      c.set("userId", session.user.id);
      c.set("user", session.user);
    }

    await next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    // Continue without auth
    await next();
  }
};
