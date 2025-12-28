const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const workItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "pending" },
  priority: String,
  dueDate: Date,
  comments: [commentSchema], // ✅ ADD THIS
}, { timestamps: true });

module.exports = mongoose.model("WorkItem", workItemSchema);
