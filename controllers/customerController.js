const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new customer
exports.registerCustomer = async (req, res) => {
  try {
    const { first_name, last_name, mobile, mobile_code_country, gender, birthday, email, password, groups } = req.body;

    // Check if the email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new customer
    const newCustomer = new Customer({ first_name, last_name, mobile, mobile_code_country, gender, birthday, email, password: hashedPassword, groups });
    await newCustomer.save();

    // Exclude the password from the response
    newCustomer.password = undefined;

    res.status(201).json({ success: true, data: newCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Login a customer
exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find customer by email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: customer._id }, 'secretkey', { expiresIn: '1h' });

    // Exclude the password from the response
    customer.password = undefined;

    res.status(200).json({ success: true, data: { token, customer } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// List all customers with pagination
exports.getCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 15 } = req.query;

    const customers = await Customer.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await Customer.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: customers,
      pagination: {
        count: customers.length,
        total,
        perPage: limit,
        currentPage: page,
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// View a single customer's details
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    customer.password = undefined; // Exclude password from response
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update customer details
exports.updateCustomer = async (req, res) => {
  try {
    const updatedData = req.body;

    // Prevent updating the email to one that's already in use
    if (updatedData.email) {
      const existingCustomer = await Customer.findOne({ email: updatedData.email });
      if (existingCustomer && existingCustomer._id.toString() !== req.params.id) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    updatedCustomer.password = undefined; // Exclude password from response
    res.status(200).json({ success: true, data: updatedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    res.status(200).json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
