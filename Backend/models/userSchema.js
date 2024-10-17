import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  niches: {
    firstNiche: { type: String },
    secondNiche: { type: String },
    thirdNiche: { type: String },
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain at least 8 characters"],
  },
  resume: { public_id: String, url: String }, // You can store the link to the resume (if uploaded) here
  coverLetter: { type: String }, // Text or link to cover letter
  role: { type: String, required: true, enum: ["Employer", "Job Seeker"] },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Export the User model
export const User = mongoose.model("User", userSchema);
