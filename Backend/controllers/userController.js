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

    // Initialize an object to store field-specific errors
    const errors = {};

    // Field validation: Check if required fields are missing and add to errors
    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    if (!phone) errors.phone = "Phone number is required.";
    if (!address) errors.address = "Address is required.";
    if (!password) errors.password = "Password is required.";
    if (!role) errors.role = "Role is required.";

    // Check for niches if the role is 'Job Seeker'
    if (role === "Job Seeker") {
      if (!firstNiche) errors.firstNiche = "First niche is required.";
      if (!secondNiche) errors.secondNiche = "Second niche is required.";
      if (!thirdNiche) errors.thirdNiche = "Third niche is required.";
    }

    // Return field-specific errors if any are present
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ errors: { email: "Email is already registered." } });
    }

    // Prepare user data for creation
    const userData = {
      name,
      email,
      phone,
      address,
      password,
      role,
      niches:
        role === "Job Seeker" ? { firstNiche, secondNiche, thirdNiche } : null,
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
              resource_type: "raw", // Treat it as a file (not an image)
              use_filename: true, // Use the original file name
              unique_filename: false, // Keep the file name unique
              access_mode: "public", // Public access to the file
            }
          );

          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res.status(500).json({
              errors: { resume: "Failed to upload resume to cloud." },
            });
          }

          // Add resume information to userData
          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (error) {
          return res
            .status(500)
            .json({ errors: { resume: "Failed to upload resume." } });
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
    // Return a general error message if something went wrong
    return res.status(500).json({ message: "An error occurred.", error });
  }
};

// Login function
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Validate if all fields are provided
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ errors: { general: "All fields are required." } });
    }

    // Find the user by email only
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ errors: { email: "User not found." } });
    }

    // Check if the role matches the user's role
    if (user.role !== role) {
      return res
        .status(403)
        .json({ errors: { role: "Authentication failed" } });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ errors: { password: "Invalid password." } });
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
    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error.", error });
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
// Update Password Controller
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Find user by ID (retrieved from the protect middleware)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available from authentication middleware
    const {
      name,
      email,
      phone,
      address,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverLetter,
      role,
    } = req.body;

    console.log("User Controller Input", {
      name,
      email,
      phone,
      address,
      firstNiche,
      secondNiche,
      thirdNiche,
      role,
    });

    // Initialize an object to store field-specific errors
    const errors = {};

    // Field validation: Check if required fields are missing and add to errors
    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    if (!phone) errors.phone = "Phone number is required.";
    if (!address) errors.address = "Address is required.";

    // Check for niches if the role is 'Job Seeker'
    let niches = null;
    if (role === "Job Seeker") {
      if (!firstNiche) errors.firstNiche = "First niche is required.";
      if (!secondNiche) errors.secondNiche = "Second niche is required.";
      if (!thirdNiche) errors.thirdNiche = "Third niche is required.";

      // Construct the niches object
      niches = { firstNiche, secondNiche, thirdNiche };
      console.log("Niches constructed", niches);
    } else {
      console.log("Role is not 'Job Seeker', niches will not be set");
    }
    // Return field-specific errors if any are present
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }
    // Check if the new email already exists (and it's not the current user's email)
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      errors.email = "Email is already registered by another user.";
      return res.status(400).json({ errors });
    }

    // Prepare updated user data
    const updatedUserData = {
      name,
      email,
      phone,
      address,
      role,
      coverLetter,
    };

    // Add niches to updatedUserData only if it's constructed
    if (niches) {
      updatedUserData.niches = niches;
    }

    // If a new resume is uploaded, handle file upload
    if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          // Upload resume to Cloudinary
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            {
              folder: "Job_Seekers_Resume",
              resource_type: "raw",
              use_filename: true,
              unique_filename: false,
              access_mode: "public",
            }
          );

          if (!cloudinaryResponse || cloudinaryResponse.error) {
            errors.resume = "Failed to upload resume to cloud.";
            return res.status(500).json({ errors });
          }

          // Add resume information to updatedUserData
          updatedUserData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (error) {
          errors.resume = "Failed to upload resume.";
          return res.status(500).json({ errors });
        }
      }
    }

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Send success response without the password
    const userResponse = { ...updatedUser._doc };
    delete userResponse.password;

    res.status(200).json({
      message: "Profile updated successfully.",
      user: userResponse,
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred.", error });
  }
};
