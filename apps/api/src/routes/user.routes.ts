import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.middleware";
import * as userController from "../controllers/user.controller";
import * as favoriteController from "../controllers/favorite.controller";

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

/**
 * @route   GET /api/users/me/favorites
 * @desc    Get current user's favorite events
 * @access  Private
 */
router.get("/me/favorites", authMiddleware, favoriteController.getUserFavorites);

export default router;
