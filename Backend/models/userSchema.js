const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  niches: {
    type: String,
    enum: ["firstNiche", "secondNiche", "thirdNiche"],
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password Must contain 8 characters"],
  },
  resume: { public_id: String, url: String }, // You can store the link to the resume (if uploaded) here
  coverLetter: { type: String }, // Text or link to cover letter
  role: { type: String, required: true, enum: ["employer", "user"] },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
