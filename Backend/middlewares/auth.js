import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Check if token is present
    if (!token) {
      return res.status(401).json({ message: "User is not authenticated." });
    }

    // Verify token and decode user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch the user from the database, excluding the password
    req.user = await User.findById(decoded.id).select("-password");

    // Check if user was found
    if (!req.user) {
      return res.status(404).json({ message: "User not found." });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle token verification errors
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token." });
    }
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired. Please log in again." });
    }

    // Log the error and return a generic authentication error
    console.error("Authentication error:", error.message);
    return res.status(500).json({ message: "Authentication failed.", error });
  }
};

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `${req.user.role} is not allowed to access this resource.`,
      });
    }
    next();
  };
};
