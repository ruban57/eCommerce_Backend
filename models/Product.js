const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  day: String,
  is_available: Boolean,
  times: [{ from: String, to: String }]
});

const overrideSchema = new mongoose.Schema({
  day: String,
  date: String
});

const optionValueSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

const optionSchema = new mongoose.Schema({
  name: String,
  display_type: String,
  values: [optionValueSchema]
});

const imageSchema = new mongoose.Schema({
  original: String,
  thumbnail: String,
  alt: String,
  default: Boolean,
  sort: Number
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  status: String,
  product_type: String,
  quantity: Number,
  booking_details: {
    location: String,
    type: String,
    time_strict_value: Number,
    time_strict_type: String,
    sessions_count: Number,
    session_gap: Number,
    session_duration: Number,
    availabilities: [availabilitySchema],
    overrides: [overrideSchema]
  },
  description: String,
  categories: [Number],
  min_amount_donating: Number,
  max_amount_donating: Number,
  sale_price: Number,
  cost_price: Number,
  sale_end: Date,
  require_shipping: Boolean,
  maximum_quantity_per_order: Number,
  weight: Number,
  weight_type: String,
  sku: String,
  mpn: String,
  gtin: String,
  hide_quantity: Boolean,
  enable_upload_image: Boolean,
  enable_note: Boolean,
  pinned: Boolean,
  active_advance: Boolean,
  subtitle: String,
  promotion_title: String,
  metadata_title: String,
  metadata_description: String,
  brand_id: Number,
  tags: [Number],
  images: [imageSchema],
  options: [optionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
