import type { Context } from "hono";
import * as eventService from "../services/event.service";
import { EventCategory, EventStatus, Visibility } from "@repo/db";

/**
 * GET /api/events - Get all events with filters
 */
export const getAllEvents = async (c: Context) => {
  try {
    const query = c.req.query();
    
    const filters: eventService.EventFilters = {
      category: query.category as EventCategory | undefined,
      status: query.status as EventStatus | undefined,
      visibility: query.visibility as Visibility | undefined,
      city: query.city,
      country: query.country,
      search: query.search,
      organizerId: query.organizerId,
    };

    // Parse dates
    if (query.startDate) {
      filters.startDate = new Date(query.startDate);
    }
    if (query.endDate) {
      filters.endDate = new Date(query.endDate);
    }

    const limit = query.limit ? parseInt(query.limit) : 50;
    const offset = query.offset ? parseInt(query.offset) : 0;

    const result = await eventService.getAllEvents(filters, limit, offset);
    return c.json(result);
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

/**
 * GET /api/events/:id - Get event by ID
 */
export const getEventById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const event = await eventService.getEventById(id);

    if (!event) {
      return c.json({ error: "Event not found" }, 404);
    }

    return c.json({ event });
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

/**
 * GET /api/events/slug/:slug - Get event by slug
 */
export const getEventBySlug = async (c: Context) => {
  try {
    const slug = c.req.param("slug");
    const event = await eventService.getEventBySlug(slug);

    if (!event) {
      return c.json({ error: "Event not found" }, 404);
    }

    return c.json({ event });
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

/**
 * POST /api/events - Create a new event
 */
export const createEvent = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();

    // Validate required fields
    if (!body.title || !body.startDate || !body.endDate || !body.category) {
      return c.json(
        {
          error: "Missing required fields: title, startDate, endDate, category",
        },
        400
      );
    }

    // Parse dates
    const eventData: eventService.CreateEventInput = {
      ...body,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    };

    const event = await eventService.createEvent(eventData, userId);
    return c.json({ event }, 201);
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

/**
 * PATCH /api/events/:id - Update event
 */
export const updateEvent = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    const body = await c.req.json();

    // Parse dates if provided
    const updateData: eventService.UpdateEventInput = { ...body };
    if (body.startDate) {
      updateData.startDate = new Date(body.startDate);
    }
    if (body.endDate) {
      updateData.endDate = new Date(body.endDate);
    }

    const event = await eventService.updateEvent(id, updateData, userId);
    return c.json({ event });
  } catch (error: any) {
    console.error("Error updating event:", error);
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
 * DELETE /api/events/:id - Delete event
 */
export const deleteEvent = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    await eventService.deleteEvent(id, userId);
    return c.json({ message: "Event deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting event:", error);
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
 * GET /api/events/:id/stats - Get event statistics
 */
export const getEventStats = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const id = c.req.param("id");
    const stats = await eventService.getEventStats(id, userId);
    return c.json({ stats });
  } catch (error: any) {
    console.error("Error fetching event stats:", error);
    if (error.message === "Event not found") {
      return c.json({ error: "Event not found" }, 404);
    }
    if (error.message.includes("Unauthorized")) {
      return c.json({ error: error.message }, 403);
    }
    throw error;
  }
};
