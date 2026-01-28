import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.middleware";
import * as userController from "../controllers/user.controller";

const router = new Hono();

/**
 * @route   GET /api/users/me
 * @desc    Get current user
 * @access  Private
 */
router.get("/me", authMiddleware, userController.getCurrentUser);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Public
 */
router.get("/:id", userController.getUserById);

/**
 * @route   PATCH /api/users/me
 * @desc    Update current user
 * @access  Private
 */
router.patch("/me", authMiddleware, userController.updateCurrentUser);

export default router;
