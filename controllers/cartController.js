const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.userId }).populate('products.product');
  res.json(cart);
};