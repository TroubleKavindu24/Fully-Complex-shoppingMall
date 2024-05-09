const express = require("express");
const router = express.Router();
const InteractiveMallEventController = require("../controller/event-controller");

// Routes for managing Interactive Mall Events
router.post("/add", InteractiveMallEventController.addEvent);
router.get("/get", InteractiveMallEventController.getAllEvents);
router.get("/get/:id", InteractiveMallEventController.getEventById);
router.put("/update/:id", InteractiveMallEventController.updateEvent);
router.delete("/delete/:id", InteractiveMallEventController.deleteEvent);

module.exports = router;
