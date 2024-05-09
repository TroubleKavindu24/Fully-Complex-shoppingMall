const { Customer } = require("../model/customer-model");

class CustomerController {
    // Add Customer
    async addCustomer(req, res) {
        const { name, email, phoneNumber, deliveryAddress, password } = req.body;
        const customer = new Customer({ name, email, password, phoneNumber, deliveryAddress });

        try {
            await customer.save();
            res.status(201).json({ success: true, customer });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Get all Customers
    async getAllCustomers(req, res) {
        try {
            const customers = await Customer.find();
            res.status(200).json({ success: true, customers });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Get Customer by ID
    async getCustomerById(req, res) {
        const { id } = req.params;

        try {
            const customer = await Customer.findById(id);
            if (!customer) {
                res.status(404).json({ success: false, message: "Customer not found" });
                return;
            }
            res.status(200).json({ success: true, customer });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Update Customer
    async updateCustomer(req, res) {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedCustomer = await Customer.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedCustomer) {
                res.status(404).json({ success: false, message: "Customer not found" });
                return;
            }
            res.status(200).json({ success: true, updatedCustomer });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Delete Customer
    async deleteCustomer(req, res) {
        const { id } = req.params;

        try {
            const deletedCustomer = await Customer.findByIdAndDelete(id);
            if (!deletedCustomer) {
                res.status(404).json({ success: false, message: "Customer not found" });
                return;
            }
            res.status(200).json({ success: true, message: "Customer deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Login Customer
    async loginCustomer(req, res) {
        const { email, password } = req.body;

        try {
            const customer = await Customer.findOne({ email });
            if (!customer) {
                return res.status(404).json({ success: false, message: 'Customer not found' });
            }
 
            if (password !== customer.password) {
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }

            res.status(200).json({ success: true, customer });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new CustomerController();
