import { Hono } from "hono";
import { auth } from "../../lib/auth";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import postRoutes from "./post.routes";
import eventRoutes from "./event.routes";
import ticketRoutes from "./ticket.routes";
import registrationRoutes from "./registration.routes";
import reviewRoutes from "./review.routes";

const api = new Hono();

// Better Auth routes - handles all /api/auth/* endpoints
api.all("/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// API routes
api.route("/auth", authRoutes);  // Custom auth routes if needed
api.route("/users", userRoutes);
api.route("/posts", postRoutes);

// Event Management routes
api.route("/events", eventRoutes);
api.route("/tickets", ticketRoutes);
api.route("/registrations", registrationRoutes);
api.route("/reviews", reviewRoutes);

export default api;

