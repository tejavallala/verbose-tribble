const express = require("express");
const todoModel = require("../model/todoModel");
const authenticateUser = require("../authenticateUser"); // Ensure the path is correct
const todoRoute = express.Router();

// Fetch Todos for the Logged-In User
todoRoute.get("/", authenticateUser, async (req, res) => {
  try {
    console.log("Fetching todos for user:", req.userId); // Log the user ID
    const todos = await todoModel.find({ user: req.userId });
    console.log("Todos fetched:", todos); // Log the fetched todos
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err); // Log the error
    res.status(400).json({ error: err.message });
  }
});

// Create a Todo for the Logged-In User
todoRoute.post("/", authenticateUser, async (req, res) => {
  try {
    const { TodoName, Description, TaskDate, TaskTime } = req.body;

    // Create a new todo associated with the logged-in user
    const newTodo = new todoModel({
      TodoName,
      Description,
      TaskDate,
      TaskTime,
      user: req.userId, // Associate the todo with the logged-in user
    });

    await newTodo.save();

    res.status(200).json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a Todo for the Logged-In User
todoRoute.put("/:id", authenticateUser, async (req, res) => {
  try {
    const { TodoName, Description, TaskDate, TaskTime } = req.body;

    // Update the todo only if it belongs to the logged-in user
    const updatedTodo = await todoModel.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, // Filter by user ID
      { TodoName, Description, TaskDate, TaskTime },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found or unauthorized." });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a Todo for the Logged-In User
todoRoute.delete("/:id", authenticateUser, async (req, res) => {
  try {
    // Delete the todo only if it belongs to the logged-in user
    const deletedTodo = await todoModel.findOneAndDelete({
      _id: req.params.id,
      user: req.userId, // Filter by user ID
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found or unauthorized." });
    }

    res.status(200).json({ message: "Todo deleted successfully", data: deletedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = todoRoute; // Export the router