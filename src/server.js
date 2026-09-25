import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

// Import routes
import movieRoutes from "./routes/movieRoutes.js";

config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

//API ROUTES
app.use("/movies", movieRoutes);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is updated and running on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection  errors)
process.on("unhandledRejection", async (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  await disconnectDB();
  process.exit(1);
});

// Handle unhandled exceptions (e.g., synchronous errors)
process.on("uncaughtException", async (error) => {
  console.error("Uncaught Exception:", error);
  await disconnectDB();
  process.exit(1);
});

// Handle graceful shutdown on SIGINT and SIGTERM signals
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing server gracefully");
  await disconnectDB();
  process.exit(0);
});
