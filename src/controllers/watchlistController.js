import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

  // Verify movie exist
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  // Check if already added to the watchlist
  const existingInWatchlist = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id, // Use the authenticated user's ID
        movieId: movieId,
      },
    },
  });

  if (existingInWatchlist) {
    return res.status(400).json({ error: "Movie already in watchlist" });
  }

  const watchlistIem = await prisma.watchlistItem.create({
    data: {
      userId: req.user.id, // Use the authenticated user's ID
      movieId,
      status: status || "PLANNED", // Default status if not provided
      rating,
      notes,
    },
  });

  res.status(201).json({ status: "success", data: { watchlistIem } });
};

const deleteFromWatchlist = async (req, res) => {
  const { movieId } = req.params;

  // Verify movie exist
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  // Check if the movie is in the user's watchlist
  const existingInWatchlist = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id, // Use the authenticated user's ID
        movieId: movieId,
      },
    },
  });

  if (!existingInWatchlist) {
    return res.status(400).json({ error: "Movie not in watchlist" });
  }

  await prisma.watchlistItem.delete({
    where: {
      userId_movieId: {
        userId: req.user.id, // Use the authenticated user's ID
        movieId: movieId,
      },
    },
  });

  res
    .status(200)
    .json({ status: "success", message: "Movie removed from watchlist" });
};

const updateWatchlistItem = async (req, res) => {
  const { movieId } = req.params;
  const { status, rating, notes } = req.body;

  // Verify movie exist
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  // Check if the movie is in the user's watchlist
  const existingInWatchlist = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id, // Use the authenticated user's ID
        movieId: movieId,
      },
    },
  });

  if (!existingInWatchlist) {
    return res.status(400).json({ error: "Movie not in watchlist" });
  }

  const updatedWatchlistItem = await prisma.watchlistItem.update({
    where: {
      userId_movieId: {
        userId: req.user.id, // Use the authenticated user's ID
        movieId: movieId,
      },
    },
    data: {
      status,
      rating,
      notes,
    },
  });

  res.status(200).json({ status: "success", data: { updatedWatchlistItem } });
};

export { addToWatchlist, deleteFromWatchlist, updateWatchlistItem };
