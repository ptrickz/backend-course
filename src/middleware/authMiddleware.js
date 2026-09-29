import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Read the toekn from request
// Verify the token

export const authMiddleware = async (req, res, next) => {
  console.log("Auth middleware invoked");
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
