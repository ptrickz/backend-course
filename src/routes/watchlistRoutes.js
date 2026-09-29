import express from "express";
import {
  addToWatchlist,
  deleteFromWatchlist,
  updateWatchlistItem,
} from "../controllers/watchListController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

router.post("/add", validateRequest(addToWatchlistSchema), addToWatchlist);

router.delete("/remove/:movieId", deleteFromWatchlist);

router.put("/update/:movieId", updateWatchlistItem);

export default router;
