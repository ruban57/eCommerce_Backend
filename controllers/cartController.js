const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    let cart = await Cart.findOne({ user });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === product);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product, quantity });
      }

      await cart.save();
      return res.status(200).json({ message: 'Cart updated', cart });
    }

    const newCart = new Cart({
      user,
      items: [{ product, quantity }]
    });

    await newCart.save();
    res.status(201).json({ message: 'Cart created', cart: newCart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();
    res.status(200).json({ message: 'Item removed', cart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove item' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = [];

    await cart.save();
    res.status(200).json({ message: 'Cart cleared', cart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};
