import type { Context } from "hono";
import * as postService from "../services/post.service";

/**
 * Get all posts
 */
export const getAllPosts = async (c: Context) => {
  try {
    const posts = await postService.getAllPosts();
    return c.json({ posts });
  } catch (error) {
    console.error("Error getting posts:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

/**
 * Get post by ID
 */
export const getPostById = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const post = await postService.getPostById(id);

    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json({ post });
  } catch (error) {
    console.error("Error getting post:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

/**
 * Create new post
 */
export const createPost = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const body = await c.req.json();

    const post = await postService.createPost({
      ...body,
      authorId: userId,
    });

    return c.json({ post }, 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

/**
 * Update post
 */
export const updatePost = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const userId = c.get("userId");
    const body = await c.req.json();

    // Check if user owns the post
    const post = await postService.getPostById(id);
    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    if (post.authorId !== userId) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    const updatedPost = await postService.updatePost(id, body);
    return c.json({ post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

/**
 * Delete post
 */
export const deletePost = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    const userId = c.get("userId");

    // Check if user owns the post
    const post = await postService.getPostById(id);
    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    if (post.authorId !== userId) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    await postService.deletePost(id);
    return c.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};
