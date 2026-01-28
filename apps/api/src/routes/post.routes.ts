import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.middleware";
import * as postController from "../controllers/post.controller";

const router = new Hono();

/**
 * @route   GET /api/posts
 * @desc    Get all posts
 * @access  Public
 */
router.get("/", postController.getAllPosts);

/**
 * @route   GET /api/posts/:id
 * @desc    Get post by ID
 * @access  Public
 */
router.get("/:id", postController.getPostById);

/**
 * @route   POST /api/posts
 * @desc    Create new post
 * @access  Private
 */
router.post("/", authMiddleware, postController.createPost);

/**
 * @route   PATCH /api/posts/:id
 * @desc    Update post
 * @access  Private
 */
router.patch("/:id", authMiddleware, postController.updatePost);

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete post
 * @access  Private
 */
router.delete("/:id", authMiddleware, postController.deletePost);

export default router;
