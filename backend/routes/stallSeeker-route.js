const express = require("express");
const router = express.Router();
const StallSeekerController = require("../controller/Stallseeker-controller");

// Routes for managing stall seekers
router.post("/add", StallSeekerController.addStallSeeker);
router.get("/get", StallSeekerController.getAllStallSeekers);
router.get("/get/:id", StallSeekerController.getStallSeekerById);
router.put("/update/:id", StallSeekerController.updateStallSeeker);
router.delete("/delete/:id", StallSeekerController.deleteStallSeeker);

module.exports = router;
