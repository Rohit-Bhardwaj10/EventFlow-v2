import { prisma } from "../../lib/prisma";
import { EventCategory, EventStatus, Visibility, LocationType } from "@repo/db";

export interface CreateEventInput {
  title: string;
  description?: string;
  shortDescription?: string;
  startDate: Date;
  endDate: Date;
  timezone?: string;
  locationType?: LocationType;
  venue?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  virtualLink?: string;
  category: EventCategory;
  tags?: string[];
  capacity?: number;
  coverImage?: string;
  images?: string[];
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  status?: EventStatus;
  visibility?: Visibility;
}

export interface EventFilters {
  category?: EventCategory;
  status?: EventStatus;
  visibility?: Visibility;
  startDate?: Date;
  endDate?: Date;
  city?: string;
  country?: string;
  search?: string;
  organizerId?: string;
}

/**
 * Generate a URL-friendly slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Ensure slug is unique by appending number if needed
 */
async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.event.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || existing.id === excludeId) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

/**
 * Create a new event
 */
export async function createEvent(data: CreateEventInput, organizerId: string) {
  const baseSlug = generateSlug(data.title);
  const slug = await ensureUniqueSlug(baseSlug);

  return prisma.event.create({
    data: {
      ...data,
      slug,
      organizerId,
      tags: data.tags || [],
      images: data.images || [],
    },
    include: {
      organizer: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      _count: {
        select: {
          registrations: true,
          reviews: true,
          tickets: true,
        },
      },
    },
  });
}

/**
 * Get all events with filters
 */
export async function getAllEvents(filters: EventFilters = {}, limit = 50, offset = 0) {
  const where: any = {};

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.visibility) {
    where.visibility = filters.visibility;
  }

  if (filters.city) {
    where.city = { contains: filters.city, mode: "insensitive" };
  }

  if (filters.country) {
    where.country = { contains: filters.country, mode: "insensitive" };
  }

  if (filters.organizerId) {
    where.organizerId = filters.organizerId;
  }

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
      { city: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.startDate || filters.endDate) {
    where.startDate = {};
    if (filters.startDate) {
      where.startDate.gte = filters.startDate;
    }
    if (filters.endDate) {
      where.startDate.lte = filters.endDate;
    }
  }

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        _count: {
          select: {
            registrations: true,
            reviews: true,
            tickets: true,
          },
        },
      },
      orderBy: { startDate: "asc" },
      take: limit,
      skip: offset,
    }),
    prisma.event.count({ where }),
  ]);

  return {
    events,
    total,
    limit,
    offset,
  };
}

/**
 * Get event by ID
 */
export async function getEventById(id: string) {
  return prisma.event.findUnique({
    where: { id },
    include: {
      organizer: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      tickets: true,
      _count: {
        select: {
          registrations: true,
          reviews: true,
        },
      },
    },
  });
}

/**
 * Get event by slug
 */
export async function getEventBySlug(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: {
      organizer: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      tickets: true,
      _count: {
        select: {
          registrations: true,
          reviews: true,
        },
      },
    },
  });
}

/**
 * Update event
 */
export async function updateEvent(id: string, data: UpdateEventInput, userId: string) {
  // Check if user is the organizer
  const event = await prisma.event.findUnique({
    where: { id },
    select: { organizerId: true, slug: true },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.organizerId !== userId) {
    throw new Error("Unauthorized: You are not the organizer of this event");
  }

  // If title is being updated, regenerate slug
  let updateData: any = { ...data };
  if (data.title) {
    const baseSlug = generateSlug(data.title);
    updateData.slug = await ensureUniqueSlug(baseSlug, id);
  }

  // Update publishedAt when status changes to PUBLISHED
  if (data.status === "PUBLISHED" && !event) {
    updateData.publishedAt = new Date();
  }

  return prisma.event.update({
    where: { id },
    data: updateData,
    include: {
      organizer: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      tickets: true,
      _count: {
        select: {
          registrations: true,
          reviews: true,
        },
      },
    },
  });
}

/**
 * Delete event
 */
export async function deleteEvent(id: string, userId: string) {
  // Check if user is the organizer
  const event = await prisma.event.findUnique({
    where: { id },
    select: { organizerId: true },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.organizerId !== userId) {
    throw new Error("Unauthorized: You are not the organizer of this event");
  }

  return prisma.event.delete({
    where: { id },
  });
}

/**
 * Get event statistics (for organizers)
 */
export async function getEventStats(eventId: string, userId: string) {
  // Check if user is the organizer
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

  const [
    totalRegistrations,
    confirmedRegistrations,
    cancelledRegistrations,
    checkedInCount,
    totalRevenue,
    ticketsSold,
    averageRating,
  ] = await Promise.all([
    prisma.registration.count({
      where: { eventId },
    }),
    prisma.registration.count({
      where: { eventId, status: "CONFIRMED" },
    }),
    prisma.registration.count({
      where: { eventId, status: "CANCELLED" },
    }),
    prisma.registration.count({
      where: { eventId, checkedIn: true },
    }),
    prisma.registration.aggregate({
      where: { eventId, status: { not: "CANCELLED" } },
      _sum: { totalAmount: true },
    }),
    prisma.ticket.aggregate({
      where: { eventId },
      _sum: { sold: true },
    }),
    prisma.review.aggregate({
      where: { eventId },
      _avg: { rating: true },
    }),
  ]);

  return {
    totalRegistrations,
    confirmedRegistrations,
    cancelledRegistrations,
    checkedInCount,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
    ticketsSold: ticketsSold._sum.sold || 0,
    averageRating: averageRating._avg.rating || 0,
  };
}
