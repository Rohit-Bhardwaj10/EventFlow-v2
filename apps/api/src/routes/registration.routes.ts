import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.middleware";
import * as registrationController from "../controllers/registration.controller";

const router = new Hono();

/**
 * GET /api/registrations - Get user's registrations (auth required)
 */
router.get("/", authMiddleware, registrationController.getUserRegistrations);

/**
 * GET /api/registrations/:id - Get registration by ID
 */
router.get("/:id", registrationController.getRegistrationById);

/**
 * PATCH /api/registrations/:id/cancel - Cancel registration (auth required)
 */
router.patch("/:id/cancel", authMiddleware, registrationController.cancelRegistration);

/**
 * POST /api/registrations/:id/checkin - Check-in attendee (auth required, organizer only)
 */
router.post("/:id/checkin", authMiddleware, registrationController.checkInAttendee);

/**
 * POST /api/registrations/checkin-qr - Check-in by QR code (auth required, organizer only)
 */
router.post("/checkin-qr", authMiddleware, registrationController.checkInByQRCode);

export default router;
