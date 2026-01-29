import { prisma } from "../../lib/prisma";

export interface CreateTicketInput {
  name: string;
  description?: string;
  price: number;
  quantity?: number; // null = unlimited
  salesStart?: Date;
  salesEnd?: Date;
}

export interface UpdateTicketInput extends Partial<CreateTicketInput> {}

/**
 * Create a ticket for an event
 */
export async function createTicket(eventId: string, data: CreateTicketInput, userId: string) {
  // Check if user is the event organizer
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { organizerId: true },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.organizerId !== userId) {
    throw new Error("Unauthorized: You are not the organizer of this event");
  }

  return prisma.ticket.create({
    data: {
      ...data,
      eventId,
    },
  });
}

/**
 * Get all tickets for an event
 */
export async function getEventTickets(eventId: string) {
  return prisma.ticket.findMany({
    where: { eventId },
    orderBy: { price: "asc" },
  });
}

/**
 * Get ticket by ID
 */
export async function getTicketById(id: string) {
  return prisma.ticket.findUnique({
    where: { id },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          startDate: true,
        },
      },
    },
  });
}

/**
 * Update ticket
 */
export async function updateTicket(id: string, data: UpdateTicketInput, userId: string) {
  // Get ticket with event to check organizer
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      event: {
        select: { organizerId: true },
      },
    },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  if (ticket.event.organizerId !== userId) {
    throw new Error("Unauthorized: You are not the organizer of this event");
  }

  return prisma.ticket.update({
    where: { id },
    data,
  });
}

/**
 * Delete ticket
 */
export async function deleteTicket(id: string, userId: string) {
  // Get ticket with event to check organizer
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      event: {
        select: { organizerId: true },
      },
      _count: {
        select: { registrations: true },
      },
    },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  if (ticket.event.organizerId !== userId) {
    throw new Error("Unauthorized: You are not the organizer of this event");
  }

  // Prevent deletion if there are registrations
  if (ticket._count.registrations > 0) {
    throw new Error("Cannot delete ticket with existing registrations");
  }

  return prisma.ticket.delete({
    where: { id },
  });
}

/**
 * Check ticket availability
 */
export async function checkTicketAvailability(ticketId: string) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  const now = new Date();

  // Check sales period
  if (ticket.salesStart && now < ticket.salesStart) {
    return {
      available: false,
      reason: "Sales have not started yet",
    };
  }

  if (ticket.salesEnd && now > ticket.salesEnd) {
    return {
      available: false,
      reason: "Sales have ended",
    };
  }

  // Check quantity
  if (ticket.quantity !== null) {
    const remaining = ticket.quantity - ticket.sold;
    if (remaining <= 0) {
      return {
        available: false,
        reason: "Sold out",
      };
    }

    return {
      available: true,
      remaining,
    };
  }

  return {
    available: true,
    remaining: null, // Unlimited
  };
}

/**
 * Increment ticket sold count
 */
export async function incrementTicketSold(ticketId: string, count: number = 1) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: {
      sold: {
        increment: count,
      },
    },
  });
}

/**
 * Decrement ticket sold count (for cancellations)
 */
export async function decrementTicketSold(ticketId: string, count: number = 1) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: {
      sold: {
        decrement: count,
      },
    },
  });
}
