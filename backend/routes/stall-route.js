const express = require("express");
const Stall = require("../model/stall.modal");

const router = express.Router();

// Get all stalls
router.get("/stalls", async (req, res) => {
  const stalls = await Stall.find();
  res.json(stalls);
});

// Create stalls (initial setup)
router.post("/stalls", async (req, res) => {
  const stalls = await Stall.insertMany(
    Array.from({ length: 25 }, () => ({ status: "available" }))
  );
  res.json(stalls);
});

// Update stall status
router.put("/stalls/book", async (req, res) => {
  const { stallIds } = req.body;

  const updatedStalls = await Stall.updateMany(
    { _id: { $in: stallIds } },
    { $set: { status: "booked" } },
    { multi: true, new: true }
  );

  res.json(updatedStalls);
});

module.exports = router;
