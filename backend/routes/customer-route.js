const express = require("express");
const router = express.Router();
const CustomerController = require("../controller/customer-controller");

// Routes for managing customers
router.post("/add", CustomerController.addCustomer);
router.get("/get", CustomerController.getAllCustomers);
router.get("/get/:id", CustomerController.getCustomerById);
router.put("/update/:id", CustomerController.updateCustomer);
router.delete("/delete/:id", CustomerController.deleteCustomer);

// Route for customer login
router.post("/login", CustomerController.loginCustomer);

module.exports = router;
