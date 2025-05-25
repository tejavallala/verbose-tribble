// Import necessary modules
const express = require("express");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();

// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "81r/UsmP~cK|nq7"); // Replace with your secret key
    req.userId = decoded._id; // Attach the user ID to the request object
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// User Registration API
userRoute.post("/register", async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Create a new user
    const user = new userModel({
      name,
      email,
      password, // In a real app, hash the password before saving
      phoneNumber,
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token for the user
    const token = jwt.sign({ _id: user._id, email: user.email }, "81r/UsmP~cK|nq7", {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Return the created user and token (excluding the password)
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json({ user: userResponse, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User Login API
userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({ email });

    // Check if the user exists and the password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ _id: user._id, email: user.email }, "81r/UsmP~cK|nq7", {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Return the user's data and token (excluding sensitive fields like password)
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).json({ user: userResponse, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch User Data API
userRoute.get("/my-profile", authenticateUser, async (req, res) => {
  try {
    // Fetch the user's data using the ID from the token
    const user = await userModel.findById(req.userId).select("-password"); // Exclude the password field
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update User Data API
userRoute.patch("/update-profile", authenticateUser, async (req, res) => {
  try {
    const updates = req.body;

    // Update the user's data using the ID from the token
    const user = await userModel
      .findByIdAndUpdate(req.userId, updates, { new: true })
      .select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = userRoute; // Ensure this line is present