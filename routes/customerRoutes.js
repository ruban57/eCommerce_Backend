const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Register a customer
router.post('/register', customerController.registerCustomer);

// Login a customer
router.post('/login', customerController.loginCustomer);

// Get all customers (with pagination)
router.get('/', customerController.getCustomers);

// Get customer by ID
router.get('/:id', customerController.getCustomerById);

// Update customer
router.put('/:id', customerController.updateCustomer);

// Delete customer
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
