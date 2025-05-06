const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

router.post('/add', addToCart);

router.get('/:userId', getCart);

router.delete('/:userId/remove/:productId', removeFromCart);

router.delete('/:userId/clear', clearCart);

module.exports = router;
