const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new order
router.post('/create', auth, orderController.createOrder);

// Get all orders
router.get('/', auth, orderController.getAllOrders);

// Get order by ID
router.get('/:id', auth, orderController.getOrderById);

module.exports = router;
