const express = require('express');
const { getCart } = require('../controllers/cartController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', auth, getCart);

module.exports = router;