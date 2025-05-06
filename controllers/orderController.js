const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      referenceId,
      customer,
      items,
      amounts,
      paymentMethod,
      currency,
      status,
      urls
    } = req.body;

    const order = new Order({
      referenceId,
      customer,
      items,
      amounts,
      paymentMethod,
      currency,
      status,
      urls,
      createdAt: new Date()
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
};

// Get order details by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order details'
    });
  }
};
