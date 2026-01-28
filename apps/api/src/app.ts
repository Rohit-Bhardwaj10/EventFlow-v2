import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";

const app = new Hono();

// Global middleware
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Health check
app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Mount routes
app.route("/api", routes);

// Error handler (must be last)
app.onError(errorHandler);

export default app;
