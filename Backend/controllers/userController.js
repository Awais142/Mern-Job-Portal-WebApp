import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

// Register function

export const register = async (req, res) => {
  const {
    name, // Changed from username to name
    email,
    password,
    phone,
    address,
    niches, // Get the entire niches object from the body
    role,
  } = req.body;

  const { firstNiche, secondNiche, thirdNiche } = niches || {}; // Handle case where niches may be undefined

  try {
    // Check if common fields are missing
    if (!name || !email || !password || !phone || !address || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // If the role is 'Job Seeker', check if niches are provided
    if (role === "Job Seeker") {
      if (!firstNiche || !secondNiche || !thirdNiche) {
        return res
          .status(400)
          .json({ message: "Please choose your preferred Niches" });
      }
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      phone,
      address,
      role, // Assign role from request body
      niches:
        role === "Job Seeker"
          ? { firstNiche, secondNiche, thirdNiche }
          : undefined, // Only include niches for 'Job Seeker'
    });

    // Save the user
    await newUser.save();

    // Respond with the created user info (without the password)
    res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user.", error });
  }
};

// Login function
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Validate if all fields are provided
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find the user by email only
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the role matches
    if (user.role !== role) {
      return res.status(403).json({ message: "Incorrect role for this user." });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true, // Cookie can't be accessed by client-side JavaScript
      // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Strict", // Prevent CSRF attacks by ensuring cookies are sent only to the same site
      maxAge: 3600000, // 1 hour in milliseconds
    });

    // Send success response
    res.status(200).json({
      message: "Login successful.",
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in.", error });
  }
};
// Get User function to get Authorized user data
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
    console.log("user from getUser", user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user information.",
      error: error.message,
    });
  }
};
