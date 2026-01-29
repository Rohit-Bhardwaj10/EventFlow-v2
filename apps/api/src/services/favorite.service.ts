import { prisma } from "../../lib/prisma";


/**
 * Add event to favorites
 */
export async function addToFavorites(eventId: string, userId: string) {
  // Check if event exists
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  // Check if already favorited
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
  });

  if (existing) {
    throw new Error("Event is already in your favorites");
  }

  return prisma.favorite.create({
    data: {
      userId,
      eventId,
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
          _count: {
            select: {
              registrations: true,
              reviews: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Remove event from favorites
 */
export async function removeFromFavorites(eventId: string, userId: string) {
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
  });

  if (!favorite) {
    throw new Error("Event is not in your favorites");
  }

  return prisma.favorite.delete({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
  });
}

/**
 * Get user's favorite events
 */
export async function getUserFavorites(userId: string) {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
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
          _count: {
            select: {
              registrations: true,
              reviews: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return favorites.map((fav) => fav.event);
}

/**
 * Check if event is favorited by user
 */
export async function isFavorited(eventId: string, userId: string) {
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
  });

  return !!favorite;
}

/**
 * Toggle favorite status
 */
export async function toggleFavorite(eventId: string, userId: string) {
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
  });

  if (existing) {
    await prisma.favorite.delete({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });
    return { favorited: false };
  } else {
    await prisma.favorite.create({
      data: {
        userId,
        eventId,
      },
    });
    return { favorited: true };
  }
}
