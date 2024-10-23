import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";

// Register User
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      password,
      role,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverLetter,
    } = req.body;

    // Check if required fields are missing
    if (!name || !email || !phone || !address || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // If the role is 'Job Seeker', check if niches are provided
    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
      return res
        .status(400)
        .json({ message: "Please provide your preferred job niches." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Prepare user data
    const userData = {
      name,
      email,
      phone,
      address,
      password,
      role,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
      },
      coverLetter,
    };

    // If the user uploaded a resume, handle file upload
    if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          // Upload resume to Cloudinary
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            {
              folder: "Job_Seekers_Resume",
              resource_type: "raw", // Ensures it's treated as a file (not an image)
              use_filename: true, // Use the original file name
              unique_filename: false, // Keep the file name unique in the folder
              access_mode: "public", // Ensure public access to the file
            }
          );

          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res
              .status(500)
              .json({ message: "Failed to upload resume to cloud." });
          }

          // Add resume info to userData
          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (error) {
          return res.status(500).json({ message: "Failed to upload resume." });
        }
      }
    }

    // Create the user
    const user = await User.create(userData);

    // Send success response without the password
    const userResponse = { ...user._doc };
    delete userResponse.password;

    res.status(201).json({
      message: "User registered successfully.",
      user: userResponse,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json({ message: "An error occurred.", error });
  }
};

// Login function
export const login = async (req, res) => {
  const { email, password, role } = req.body;
  console.log("From User Controller", email, password, role);

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
      return res.status(403).json({ message: "Authentication failed" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or passowrd." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );
    // Send success response
    res.status(200).json({
      message: "Login successful.",
      token,
      id: user._id,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in.", error });
  }
};

//Logout Function
export const logout = async (req, res) => {
  try {
    // Clear the token cookie by setting it to an empty string and expiring it
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()), // Expire the cookie immediately
        httpOnly: true, // Ensure cookie is only accessible by the server
      })
      .json({
        success: true,
        message: "Logged out successfully.",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while logging out.",
      error: error.message,
    });
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
