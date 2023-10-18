const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const cors = require("cors");
app.use(cors());
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todo-app", {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

app.get("/", (req, res) => {
  res.send("Welcome");
});
// Define your ToDo model schema
const todoSchema = new mongoose.Schema({
  task: String,
  done: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your API routes

// Add a new ToDo item
app.post("/api/todos", async (req, res) => {
  const newTodo = new Todo({
    task: req.body.task,
    done: false,
  });

  try {
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving the todo");
  }
});

// Get all ToDo items
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (err) {
    console.error(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
