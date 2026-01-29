import { prisma } from "../../lib/prisma";

/**
 * Get user by ID
 */
export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      // Don't return sensitive fields
    },
  });
};

/**
 * Update user
 */
export const updateUser = async (id: string, data: { name?: string; image?: string }) => {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      updatedAt: true,
    },
  });
};

