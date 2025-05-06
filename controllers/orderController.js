const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount, paymentMethod, shippingAddress } = req.body;

    const order = new Order({
      user,
      products,
      totalAmount,
      paymentMethod,
      shippingAddress
    });

    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create order' });
  }
};
