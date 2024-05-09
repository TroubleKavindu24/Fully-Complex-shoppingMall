const { InteractiveMallEvent } = require("../model/event-modal");

class InteractiveMallEventController {
    // Add Interactive Mall Event
    async addEvent(req, res) {
        const { eventName, description, dateTime, location, category, capacity, registrationLink } = req.body;
        const event = new InteractiveMallEvent({  eventName, description, dateTime, location, category, capacity, registrationLink });

        try {
            await event.save();
            res.status(201).json({ success: true, 'eventList':event });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Get all Interactive Mall Events
    async getAllEvents(req, res) {
        try {
            const events = await InteractiveMallEvent.find();
            res.status(200).json({ success: true, 'eventList':events });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Get Interactive Mall Event by ID
    async getEventById(req, res) {
        const { id } = req.params;

        try {
            const event = await InteractiveMallEvent.findById(id);
            if (!event) {
                res.status(404).json({ success: false, message: "Event not found" });
                return;
            }
            res.status(200).json({ success: true, 'eventList': event });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Update Interactive Mall Event
    async updateEvent(req, res) {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedEvent = await InteractiveMallEvent.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedEvent) {
                res.status(404).json({ success: false, message: "Event not found" });
                return;
            }
            res.status(200).json({ success: true, 'eventList': updatedEvent });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Delete Interactive Mall Event
    async deleteEvent(req, res) {
        const { id } = req.params;

        try {
            const deletedEvent = await InteractiveMallEvent.findByIdAndDelete(id);
            if (!deletedEvent) {
                res.status(404).json({ success: false, message: "Event not found" });
                return;
            }
            res.status(200).json({ success: true, message: "Event deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new InteractiveMallEventController();
