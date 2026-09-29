import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const creatorId = "7aa5ae51-2be4-478c-8444-bdfdfbc6f33a";

const movies = [
  {
    title: "Inception",
    overview:
      "A skilled thief is given a chance at redemption if he can successfully perform an inception.",
    releaseYear: 2010,
    genres: ["Action", "Science Fiction"],
    runtime: 148,
    posterUrl: "",
    createdBy: creatorId,
  },
  {
    title: "The Dark Knight",
    overview:
      "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into chaos.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl: "",
    createdBy: creatorId,
  },
  {
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: 2014,
    genres: ["Adventure", "Drama", "Science Fiction"],
    runtime: 169,
    posterUrl: "",
    createdBy: creatorId,
  },
  {
    title: "The Matrix",
    overview:
      "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    releaseYear: 1999,
    genres: ["Action", "Science Fiction"],
    runtime: 136,
    posterUrl: "",
    createdBy: creatorId,
  },
  {
    title: "The Shawshank Redemption",
    overview:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseYear: 1994,
    genres: ["Drama", "Crime", "Thriller"],
    runtime: 142,
    posterUrl: "",
    createdBy: creatorId,
  },
  {
    title: "The Godfather",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseYear: 1972,
    genres: ["Crime", "Drama"],
    runtime: 175,
    posterUrl: "",
    createdBy: creatorId,
  },
  {
    title: "Pulp Fiction",
    overview:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    runtime: 154,
    posterUrl: "",
    createdBy: creatorId,
  },
  {
    title: "Fight Club",
    overview:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much more.",
    releaseYear: 1999,
    genres: ["Drama", "Thriller", "Mystery"],
    runtime: 139,
    posterUrl: "",
    createdBy: creatorId,
  },
  {
    title: "Forrest Gump",
    overview:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    releaseYear: 1994,
    genres: ["Drama", "Romance", "Comedy", "War"],
    runtime: 142,
    posterUrl: "",
    createdBy: creatorId,
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    overview:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    releaseYear: 2001,
    genres: ["Fantasy", "Adventure", "Action", "Drama", "Epic"],
    runtime: 178,
    posterUrl: "",
    createdBy: creatorId,
  },
];

const main = async () => {
  console.log("Seeding movies...");
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`Created movie: ${movie.title}`);
  }
  console.log("Seeding completed.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
