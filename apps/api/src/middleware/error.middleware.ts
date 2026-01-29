import type { Context } from "hono";
import type { ErrorHandler } from "hono";

/**
 * Type guards and interfaces for error handling
 */
interface PrismaError extends Error {
  code: string;
  meta?: Record<string, unknown>;
}

interface ValidationError extends Error {
  details?: unknown;
}

function isPrismaError(err: Error): err is PrismaError {
  return err.name === "PrismaClientKnownRequestError" && "code" in err;
}

function isValidationError(err: Error): err is ValidationError {
  return err.name === "ValidationError";
}

/**
 * Global error handler
 */
export const errorHandler: ErrorHandler = (err, c) => {
  console.error("Error:", err);

  // Prisma errors
  if (isPrismaError(err)) {
    if (err.code === "P2002") {
      return c.json({ error: "Resource already exists" }, 409);
    }
    if (err.code === "P2025") {
      return c.json({ error: "Resource not found" }, 404);
    }
  }

  // Validation errors
  if (isValidationError(err)) {
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
