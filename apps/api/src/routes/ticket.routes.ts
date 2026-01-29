import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.middleware";
import * as ticketController from "../controllers/ticket.controller";

const router = new Hono();

/**
 * GET /api/tickets/:id - Get ticket by ID
 */
router.get("/:id", ticketController.getTicketById);

/**
 * PATCH /api/tickets/:id - Update ticket (auth required, organizer only)
 */
router.patch("/:id", authMiddleware, ticketController.updateTicket);

/**
 * DELETE /api/tickets/:id - Delete ticket (auth required, organizer only)
 */
router.delete("/:id", authMiddleware, ticketController.deleteTicket);

/**
 * GET /api/tickets/:id/availability - Check ticket availability
 */
router.get("/:id/availability", ticketController.checkTicketAvailability);

export default router;
