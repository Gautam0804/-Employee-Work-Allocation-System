const express = require("express");
const WorkItem = require("../models/WorkItem");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

/* CREATE WORK (Manager only) */
router.post("/", auth, role("manager"), async (req, res) => {
  const work = await WorkItem.create({
    ...req.body,
    status: "pending",
  });
  res.json(work);
});

/* GET WORK ITEMS */
router.get("/", auth, async (req, res) => {
  if (req.user.role === "employee") {
    const works = await WorkItem.find({ assignedTo: req.user.id });
    return res.json(works);
  }

  const works = await WorkItem.find();
  res.json(works);
});

/* UPDATE STATUS (Assigned Employee) */
router.patch("/:id/status", auth, role("employee"), async (req, res) => {
  const work = await WorkItem.findById(req.params.id);

  if (!work || work.assignedTo.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not allowed" });
  }

  work.status = req.body.status;
  await work.save();

  res.json(work);
});

/* DELETE WORK (Manager) */
router.delete("/:id", auth, role("manager"), async (req, res) => {
  await WorkItem.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted successfully" });
});

module.exports = router;
