import type { Context } from "hono";
import type { ErrorHandler } from "hono";

/**
 * Global error handler
 */
export const errorHandler: ErrorHandler = (err, c) => {
  console.error("Error:", err);

  // Prisma errors
  if (err.name === "PrismaClientKnownRequestError") {
    if (err.code === "P2002") {
      return c.json({ error: "Resource already exists" }, 409);
    }
    if (err.code === "P2025") {
      return c.json({ error: "Resource not found" }, 404);
    }
  }

  // Validation errors
  if (err.name === "ValidationError") {
    return c.json({ error: err.message, details: err.details }, 400);
  }

  // Default error
  return c.json(
    {
      error: "Internal server error",
      message: process.env.NODE_ENV === "development" ? err.message : undefined,
    },
    500
  );
};
