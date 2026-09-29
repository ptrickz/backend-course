import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Name, email, and password are required",
    });
  }

  const userExist = await prisma.user.findUnique({ where: { email } });
  if (userExist) {
    return res
      .status(400)
      .json({ status: "error", message: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Generate JWT Token
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  });
};

// Handle login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid credentials" });
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid credentials" });
  }

  // Generate JWT Token
  const token = generateToken(user.id, res);

  res.status(200).json({
    status: "success",
    message: "Login successful",
    data: {
      id: user.id,
      email: user.email,
    },
    token,
  });
};

// Logout user
const logoutUser = (req, res) => {
  res.cookie("jwt", {
    httpOnly: true,
    expires: new Date(0), // Set the cookie to expire immediately
  });
  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};

export { registerUser, loginUser, logoutUser };
