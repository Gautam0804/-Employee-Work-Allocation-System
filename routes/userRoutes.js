const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

/* ================= ADMIN ROUTES ================= */

/* ADMIN – GET ALL USERS */
router.get("/", auth, role("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch users" });
  }
});

/* ADMIN – DELETE USER */
router.delete("/:id", auth, role("admin"), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete user" });
  }
});

/* ADMIN – UPDATE USER ROLE */
router.patch("/:id/role", auth, role("admin"), async (req, res) => {
  try {
    const { role: newRole } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      role: newRole,
    });

    res.json({ msg: "Role updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update role" });
  }
});

/* ================= MANAGER ROUTES ================= */

/* MANAGER – GET EMPLOYEES (FOR TASK ASSIGNMENT) */
router.get("/employees", auth, async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" })
      .select("_id name email"); // ✅ EMAIL INCLUDED

    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch employees" });
  }
});

module.exports = router;
