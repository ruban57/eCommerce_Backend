const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  const order = await Order.create({
    user: req.user.userId,
    items,
    totalAmount
  });
  res.json(order);
};