const express = require('express');
const { createOrder } = require('../controllers/orderController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', auth, createOrder);

module.exports = router;