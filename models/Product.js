const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  description: String,
  price: Number,
  discount: Number,
  images: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  stock: Number,
  isFeatured: Boolean
});

module.exports = mongoose.model('Product', productSchema);