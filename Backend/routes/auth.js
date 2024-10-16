import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "User is not authenticated." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(404).json({ message: "User not found." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Authentication failed.", error });
  }
};

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          message: `${req.user.role} is not allowed to access this resource.`,
        });
    }
    next();
  };
};
