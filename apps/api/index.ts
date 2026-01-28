import { Hono } from "hono";
import { auth } from "./lib/auth";
import { prisma } from "./lib/prisma";

const app = new Hono();

// Health check
app.get("/", (c) => {
  return c.json({ message: "EventFlow API is running" });
});

// Better Auth routes - handles all auth endpoints
// This mounts all Better Auth routes under /api/auth/*
app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

// Protected route example
app.get("/api/user", async (c) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  return c.json({ user: session.user });
});

// Example: Get all posts (public)
app.get("/api/posts", async (c) => {
  const posts = await prisma.post.findMany({
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

  return c.json({ posts });
});

// Example: Create post (protected)
app.post("/api/posts", async (c) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const body = await c.req.json();

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: body.published || false,
      authorId: session.user.id,
    },
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

  return c.json({ post });
});

const port = process.env.PORT || 3001;

console.log(`🚀 Server running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};