import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.middleware";
import * as reviewController from "../controllers/review.controller";

const router = new Hono();

/**
 * PATCH /api/reviews/:id - Update review (auth required)
 */
router.patch("/:id", authMiddleware, reviewController.updateReview);

/**
 * DELETE /api/reviews/:id - Delete review (auth required)
 */
router.delete("/:id", authMiddleware, reviewController.deleteReview);

export default router;
