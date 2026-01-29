import type { Context } from "hono";
import * as registrationService from "../services/registration.service";

/**
 * POST /api/events/:eventId/register - Register for an event
 */
export const registerForEvent = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const eventId = c.req.param("eventId");
    const body = await c.req.json();

    const registration = await registrationService.registerForEvent(
      eventId,
      userId,
      body
    );

    return c.json({ registration }, 201);
  } catch (error: any) {
    console.error("Error registering for event:", error);
    if (
      error.message === "Event not found" ||
      error.message === "Ticket not found"
    ) {
      return c.json({ error: error.message }, 404);
    }
    if (
      error.message.includes("already registered") ||
      error.message.includes("full") ||
      error.message.includes("not open") ||
      error.message.includes("not available")
    ) {
      return c.json({ error: error.message }, 400);
    }
    throw error;
  }
};

/**
 * GET /api/registrations - Get user's registrations
 */
export const getUserRegistrations = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const registrations = await registrationService.getUserRegistrations(userId);
    return c.json({ registrations });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    throw error;
  }
};

/**
 * GET /api/registrations/:id - Get registration by ID
 */
export const getRegistrationById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const registration = await registrationService.getRegistrationById(id);

    if (!registration) {
      return c.json({ error: "Registration not found" }, 404);
    }

    return c.json({ registration });
  } catch (error) {
    console.error("Error fetching registration:", error);
    throw error;
  }
};

/**
 * GET /api/events/:eventId/registrations - Get event registrations (organizer only)
 */
export const getEventRegistrations = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const eventId = c.req.param("eventId");
    const registrations = await registrationService.getEventRegistrations(
      eventId,
      userId
    );

    return c.json({ registrations });
  } catch (error: any) {
    console.error("Error fetching event registrations:", error);
    if (error.message === "Event not found") {
      return c.json({ error: "Event not found" }, 404);
    }
    if (error.message.includes("Unauthorized")) {
      return c.json({ error: error.message }, 403);
    }
    throw error;
  }
};

/**
 * PATCH /api/registrations/:id/cancel - Cancel registration
 */
export const cancelRegistration = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    const registration = await registrationService.cancelRegistration(id, userId);

    return c.json({ registration });
  } catch (error: any) {
    console.error("Error cancelling registration:", error);
    if (error.message === "Registration not found") {
      return c.json({ error: "Registration not found" }, 404);
    }
    if (error.message.includes("Unauthorized")) {
      return c.json({ error: error.message }, 403);
    }
    if (
      error.message.includes("already cancelled") ||
      error.message.includes("past events")
    ) {
      return c.json({ error: error.message }, 400);
    }
    throw error;
  }
};

/**
 * POST /api/registrations/:id/checkin - Check-in attendee
 */
export const checkInAttendee = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    const registration = await registrationService.checkInAttendee(id, userId);

    return c.json({ registration });
  } catch (error: any) {
    console.error("Error checking in attendee:", error);
    if (error.message === "Registration not found") {
      return c.json({ error: "Registration not found" }, 404);
    }
    if (error.message.includes("Unauthorized")) {
      return c.json({ error: error.message }, 403);
    }
    if (
      error.message.includes("cancelled") ||
      error.message.includes("already checked in")
    ) {
      return c.json({ error: error.message }, 400);
    }
    throw error;
  }
};

/**
 * POST /api/registrations/checkin-qr - Check-in by QR code
 */
export const checkInByQRCode = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    if (!body.qrCode) {
      return c.json({ error: "QR code is required" }, 400);
    }

    const result = await registrationService.checkInByQRCode(body.qrCode, userId);
    return c.json(result);
  } catch (error: any) {
    console.error("Error checking in by QR code:", error);
    if (error.message === "Invalid QR code") {
      return c.json({ error: "Invalid QR code" }, 404);
    }
    if (error.message.includes("Unauthorized")) {
      return c.json({ error: error.message }, 403);
    }
    if (error.message.includes("cancelled")) {
      return c.json({ error: error.message }, 400);
    }
    throw error;
  }
};
