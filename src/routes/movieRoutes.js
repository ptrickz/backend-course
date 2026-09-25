import express from "express";

const router = express.Router();

const movies = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    description:
      "A mind-bending thriller about dream invasion and manipulation.",
  },
  {
    id: 2,
    title: "The Matrix",
    director: "The Wachowskis",
    year: 1999,
    description:
      "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    year: 2014,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
];

router.get("/list", (req, res) => {
  res.json(movies);
});

router.get("/details/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === movieId);
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  res.json(movie);
});

router.post("/add", (req, res) => {
  const { title, director, year, description } = req.body;
  const newMovie = {
    id: movies.length + 1,
    title,
    director,
    year,
    description,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

export default router;
