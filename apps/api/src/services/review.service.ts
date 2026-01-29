import { prisma } from "../../lib/prisma";


export interface CreateReviewInput {
  rating: number;
  comment?: string;
}

/**
 * Create a review for an event
 */
export async function createReview(
  eventId: string,
  userId: string,
  data: CreateReviewInput
) {
  // Validate rating
  if (data.rating < 1 || data.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  // Check if event exists
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  // Check if event has ended
  if (event.endDate > new Date()) {
    throw new Error("You can only review events that have ended");
  }

  // Check if user attended the event
  const registration = await prisma.registration.findUnique({
    where: {
      eventId_userId: {
        eventId,
        userId,
      },
    },
  });

  if (!registration || registration.status === "CANCELLED") {
    throw new Error("You must have attended the event to review it");
  }

  // Check if user already reviewed this event
  const existingReview = await prisma.review.findUnique({
    where: {
      eventId_userId: {
        eventId,
        userId,
      },
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this event");
  }

  return prisma.review.create({
    data: {
      eventId,
      userId,
      rating: data.rating,
      comment: data.comment,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}

/**
 * Get all reviews for an event
 */
export async function getEventReviews(eventId: string) {
  return prisma.review.findMany({
    where: { eventId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Get review by ID
 */
export async function getReviewById(id: string) {
  return prisma.review.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      event: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
}

/**
 * Update review
 */
export async function updateReview(
  id: string,
  userId: string,
  data: Partial<CreateReviewInput>
) {
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.userId !== userId) {
    throw new Error("Unauthorized: This is not your review");
  }

  // Validate rating if provided
  if (data.rating && (data.rating < 1 || data.rating > 5)) {
    throw new Error("Rating must be between 1 and 5");
  }

  return prisma.review.update({
    where: { id },
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}

/**
 * Delete review
 */
export async function deleteReview(id: string, userId: string) {
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.userId !== userId) {
    throw new Error("Unauthorized: This is not your review");
  }

  return prisma.review.delete({
    where: { id },
  });
}

/**
 * Get user's reviews
 */
export async function getUserReviews(userId: string) {
  return prisma.review.findMany({
    where: { userId },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          coverImage: true,
          startDate: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Get event average rating
 */
export async function getEventAverageRating(eventId: string) {
  const result = await prisma.review.aggregate({
    where: { eventId },
    _avg: { rating: true },
    _count: true,
  });

  return {
    averageRating: result._avg.rating || 0,
    totalReviews: result._count,
  };
}
