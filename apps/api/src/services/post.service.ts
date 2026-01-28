import { prisma } from "../../lib/prisma";

/**
 * Get all posts
 */
export const getAllPosts = async () => {
  return prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { id: "desc" },
  });
};

/**
 * Get post by ID
 */
export const getPostById = async (id: number) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

/**
 * Create post
 */
export const createPost = async (data: {
  title: string;
  content?: string;
  published?: boolean;
  authorId: string;
}) => {
  return prisma.post.create({
    data,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

/**
 * Update post
 */
export const updatePost = async (
  id: number,
  data: {
    title?: string;
    content?: string;
    published?: boolean;
  }
) => {
  return prisma.post.update({
    where: { id },
    data,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

/**
 * Delete post
 */
export const deletePost = async (id: number) => {
  return prisma.post.delete({
    where: { id },
  });
};

/**
 * Get user's posts
 */
export const getUserPosts = async (authorId: string) => {
  return prisma.post.findMany({
    where: { authorId },
    orderBy: { id: "desc" },
  });
};
