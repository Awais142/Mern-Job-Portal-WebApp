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

  console.log("Request Body:", req.body); // Log the entire request body to see what is being received

  const { firstNiche, secondNiche, thirdNiche } = niches;
  console.log("Name: ", name, "Email: ", email, "Password: ", password);
  console.log("Phone: ", phone, "Address: ", address);
  console.log("Niches:", firstNiche, secondNiche, thirdNiche);
  console.log("Role: ", role);

  try {
    // Check if any field is missing
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !firstNiche ||
      !secondNiche ||
      !thirdNiche ||
      !role
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create a new user
    const newUser = new User({
      name, // Use 'name' instead of 'username'
      email,
      password,
      phone,
      address,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
      },
      role, // Assign role from request body
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
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Respond with the user data and token
    res.status(200).json({
      message: "Login successful.",
      user: { id: user._id, username: user.username, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in.", error });
  }
};
