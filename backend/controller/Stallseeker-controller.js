const { StallSeeker } = require("../model/stallSeeker-model");

class StallSeekerController {
    // Add Stall Seeker
    async addStallSeeker(req, res) {
        const { name, email, phoneNumber, registrationID, registrationStatus } = req.body;
        const stallSeeker = new StallSeeker({ name, email, phoneNumber, registrationID, registrationStatus });

        try {
            await stallSeeker.save();
            res.status(201).json({ success: true, stallSeeker });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Get all Stall Seekers
    async getAllStallSeekers(req, res) {
        try {
            const stallSeekers = await StallSeeker.find();
            res.status(200).json({ success: true, stallSeekers });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Get Stall Seeker by ID
    async getStallSeekerById(req, res) {
        const { id } = req.params;

        try {
            const stallSeeker = await StallSeeker.findById(id);
            if (!stallSeeker) {
                res.status(404).json({ success: false, message: "Stall Seeker not found" });
                return;
            }
            res.status(200).json({ success: true, stallSeeker });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Update Stall Seeker
    async updateStallSeeker(req, res) {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedStallSeeker = await StallSeeker.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedStallSeeker) {
                res.status(404).json({ success: false, message: "Stall Seeker not found" });
                return;
            }
            res.status(200).json({ success: true, updatedStallSeeker });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Delete Stall Seeker
    async deleteStallSeeker(req, res) {
        const { id } = req.params;

        try {
            const deletedStallSeeker = await StallSeeker.findByIdAndDelete(id);
            if (!deletedStallSeeker) {
                res.status(404).json({ success: false, message: "Stall Seeker not found" });
                return;
            }
            res.status(200).json({ success: true, message: "Stall Seeker deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new StallSeekerController();
