import type { Context } from "hono";
import * as ticketService from "../services/ticket.service";

/**
 * GET /api/events/:eventId/tickets - Get all tickets for an event
 */
export const getEventTickets = async (c: Context) => {
  try {
    const eventId = c.req.param("eventId");
    const tickets = await ticketService.getEventTickets(eventId);
    return c.json({ tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

/**
 * GET /api/tickets/:id - Get ticket by ID
 */
export const getTicketById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const ticket = await ticketService.getTicketById(id);

    if (!ticket) {
      return c.json({ error: "Ticket not found" }, 404);
    }

    return c.json({ ticket });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    throw error;
  }
};

/**
 * POST /api/events/:eventId/tickets - Create a new ticket
 */
export const createTicket = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const eventId = c.req.param("eventId");
    const body = await c.req.json();

    // Validate required fields
    if (!body.name || body.price === undefined) {
      return c.json(
        { error: "Missing required fields: name, price" },
        400
      );
    }

    // Parse dates if provided
    const ticketData: ticketService.CreateTicketInput = {
      ...body,
      salesStart: body.salesStart ? new Date(body.salesStart) : undefined,
      salesEnd: body.salesEnd ? new Date(body.salesEnd) : undefined,
    };

    const ticket = await ticketService.createTicket(eventId, ticketData, userId);
    return c.json({ ticket }, 201);
  } catch (error: any) {
    console.error("Error creating ticket:", error);
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
 * PATCH /api/tickets/:id - Update ticket
 */
export const updateTicket = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    const body = await c.req.json();

    // Parse dates if provided
    const updateData: ticketService.UpdateTicketInput = { ...body };
    if (body.salesStart) {
      updateData.salesStart = new Date(body.salesStart);
    }
    if (body.salesEnd) {
      updateData.salesEnd = new Date(body.salesEnd);
    }

    const ticket = await ticketService.updateTicket(id, updateData, userId);
    return c.json({ ticket });
  } catch (error: any) {
    console.error("Error updating ticket:", error);
    if (error.message === "Ticket not found") {
      return c.json({ error: "Ticket not found" }, 404);
    }
    if (error.message.includes("Unauthorized")) {
      return c.json({ error: error.message }, 403);
    }
    throw error;
  }
};

/**
 * DELETE /api/tickets/:id - Delete ticket
 */
export const deleteTicket = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    await ticketService.deleteTicket(id, userId);
    return c.json({ message: "Ticket deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting ticket:", error);
    if (error.message === "Ticket not found") {
      return c.json({ error: "Ticket not found" }, 404);
    }
    if (error.message.includes("Unauthorized")) {
      return c.json({ error: error.message }, 403);
    }
    if (error.message.includes("existing registrations")) {
      return c.json({ error: error.message }, 400);
    }
    throw error;
  }
};

/**
 * GET /api/tickets/:id/availability - Check ticket availability
 */
export const checkTicketAvailability = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const availability = await ticketService.checkTicketAvailability(id);
    return c.json(availability);
  } catch (error: any) {
    console.error("Error checking availability:", error);
    if (error.message === "Ticket not found") {
      return c.json({ error: "Ticket not found" }, 404);
    }
    throw error;
  }
};
