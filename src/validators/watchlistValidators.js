import { z } from "zod";

const addToWatchlistSchema = z.object({
  movieId: z.uuid({ message: "Invalid movie ID" }),
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      message: "Invalid status",
    })
    .optional(),
  rating: z.coerce
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10")
    .optional(),
  notes: z.string().optional(),
});

export { addToWatchlistSchema };
