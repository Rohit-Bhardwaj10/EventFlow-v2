import * as ticketService from "./ticket.service";
import { prisma } from "../../lib/prisma";


export interface CreateRegistrationInput {
  ticketId?: string;
  attendeeCount?: number;
  attendeeName?: string;
  attendeeEmail?: string;
  phoneNumber?: string;
  specialRequests?: string;
}

/**
 * Generate a unique QR code for registration
 */
function generateQRCode(): string {
  // Generate a unique alphanumeric code
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 12; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `REG-${code}`;
}

/**
 * Ensure QR code is unique
 */
async function ensureUniqueQRCode(): Promise<string> {
  let qrCode = generateQRCode();
  let attempts = 0;

  while (attempts < 10) {
    const existing = await prisma.registration.findUnique({
      where: { qrCode },
    });

    if (!existing) {
      return qrCode;
    }

    qrCode = generateQRCode();
    attempts++;
  }

  throw new Error("Failed to generate unique QR code");
}

/**
 * Register a user for an event
 */
export async function registerForEvent(
  eventId: string,
  userId: string,
  data: CreateRegistrationInput
) {
  // Check if event exists
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  // Check if event is published
  if (event.status !== "PUBLISHED") {
    throw new Error("Event is not open for registration");
  }

  // Check event capacity
  if (event.capacity) {
    const currentRegistrations = event._count.registrations;
    const requestedCount = data.attendeeCount || 1;

    if (currentRegistrations + requestedCount > event.capacity) {
      throw new Error("Event is full");
    }
  }

  // Check if user is already registered
  const existingRegistration = await prisma.registration.findUnique({
    where: {
      eventId_userId: {
        eventId,
        userId,
      },
    },
  });

  if (existingRegistration) {
    throw new Error("You are already registered for this event");
  }

  // If ticket is specified, check availability
  let totalAmount = 0;
  if (data.ticketId) {
    const availability = await ticketService.checkTicketAvailability(data.ticketId);
    if (!availability.available) {
      throw new Error(availability.reason || "Ticket not available");
    }

    // Get ticket price
    const ticket = await ticketService.getTicketById(data.ticketId);
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    totalAmount = ticket.price * (data.attendeeCount || 1);

    // Increment ticket sold count
    await ticketService.incrementTicketSold(data.ticketId, data.attendeeCount || 1);
  }

  // Generate QR code
  const qrCode = await ensureUniqueQRCode();

  // Create registration
  return prisma.registration.create({
    data: {
      eventId,
      userId,
      ticketId: data.ticketId,
      attendeeCount: data.attendeeCount || 1,
      attendeeName: data.attendeeName,
      attendeeEmail: data.attendeeEmail,
      phoneNumber: data.phoneNumber,
      specialRequests: data.specialRequests,
      totalAmount,
      qrCode,
      status: "CONFIRMED", // Auto-confirm for now (will handle payment later)
    },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          startDate: true,
          venue: true,
        },
      },
      ticket: true,
    },
  });
}

/**
 * Get user's registrations
 */
export async function getUserRegistrations(userId: string) {
  return prisma.registration.findMany({
    where: {
      userId,
      status: { not: "CANCELLED" },
    },
    include: {
      event: {
        include: {
          organizer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      ticket: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Get registration by ID
 */
export async function getRegistrationById(id: string) {
  return prisma.registration.findUnique({
    where: { id },
    include: {
      event: true,
      ticket: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

/**
 * Get event registrations (for organizers)
 */
export async function getEventRegistrations(eventId: string, userId: string) {
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

  return prisma.registration.findMany({
    where: { eventId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      ticket: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Cancel registration
 */
export async function cancelRegistration(id: string, userId: string) {
  const registration = await prisma.registration.findUnique({
    where: { id },
    include: {
      event: true,
    },
  });

  if (!registration) {
    throw new Error("Registration not found");
  }

  if (registration.userId !== userId) {
    throw new Error("Unauthorized: This is not your registration");
  }

  if (registration.status === "CANCELLED") {
    throw new Error("Registration is already cancelled");
  }

  // Check if event has already passed
  if (registration.event.endDate < new Date()) {
    throw new Error("Cannot cancel registration for past events");
  }

  // Decrement ticket sold count if ticket was purchased
  if (registration.ticketId) {
    await ticketService.decrementTicketSold(
      registration.ticketId,
      registration.attendeeCount
    );
  }

  // Update registration status
  return prisma.registration.update({
    where: { id },
    data: {
      status: "CANCELLED",
      cancelledAt: new Date(),
    },
  });
}

/**
 * Check-in attendee (for organizers)
 */
export async function checkInAttendee(registrationId: string, userId: string) {
  const registration = await prisma.registration.findUnique({
    where: { id: registrationId },
    include: {
      event: {
        select: { organizerId: true },
      },
    },
  });

  if (!registration) {
    throw new Error("Registration not found");
  }

  if (registration.event.organizerId !== userId) {
    throw new Error("Unauthorized: You are not the organizer of this event");
  }

  if (registration.status === "CANCELLED") {
    throw new Error("Cannot check-in cancelled registration");
  }

  if (registration.checkedIn) {
    throw new Error("Attendee is already checked in");
  }

  return prisma.registration.update({
    where: { id: registrationId },
    data: {
      checkedIn: true,
      checkedInAt: new Date(),
    },
  });
}

/**
 * Check-in by QR code
 */
export async function checkInByQRCode(qrCode: string, userId: string) {
  const registration = await prisma.registration.findUnique({
    where: { qrCode },
    include: {
      event: {
        select: { organizerId: true, title: true },
      },
      user: {
        select: { name: true, email: true },
      },
    },
  });

  if (!registration) {
    throw new Error("Invalid QR code");
  }

  if (registration.event.organizerId !== userId) {
    throw new Error("Unauthorized: You are not the organizer of this event");
  }

  if (registration.status === "CANCELLED") {
    throw new Error("This registration has been cancelled");
  }

  if (registration.checkedIn) {
    return {
      success: true,
      alreadyCheckedIn: true,
      message: "Attendee was already checked in",
      registration,
    };
  }

  const updated = await prisma.registration.update({
    where: { qrCode },
    data: {
      checkedIn: true,
      checkedInAt: new Date(),
    },
    include: {
      event: {
        select: { title: true },
      },
      user: {
        select: { name: true, email: true },
      },
    },
  });

  return {
    success: true,
    alreadyCheckedIn: false,
    message: "Check-in successful",
    registration: updated,
  };
}
