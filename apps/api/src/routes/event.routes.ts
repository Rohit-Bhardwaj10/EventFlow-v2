import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.middleware";
import * as eventController from "../controllers/event.controller";

const router = new Hono();

/**
 * GET /api/events - Get all events with filters
 */
router.get("/", eventController.getAllEvents);

/**
 * GET /api/events/slug/:slug - Get event by slug
 */
router.get("/slug/:slug", eventController.getEventBySlug);

/**
 * GET /api/events/:id - Get event by ID
 */
router.get("/:id", eventController.getEventById);

/**
 * POST /api/events - Create a new event (auth required)
 */
router.post("/", authMiddleware, eventController.createEvent);

/**
 * PATCH /api/events/:id - Update event (auth required, organizer only)
 */
router.patch("/:id", authMiddleware, eventController.updateEvent);

/**
 * DELETE /api/events/:id - Delete event (auth required, organizer only)
 */
router.delete("/:id", authMiddleware, eventController.deleteEvent);

/**
 * GET /api/events/:id/stats - Get event statistics (auth required, organizer only)
 */
router.get("/:id/stats", authMiddleware, eventController.getEventStats);

export default router;
