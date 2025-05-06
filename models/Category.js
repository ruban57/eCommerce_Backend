const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  status: { type: String, enum: ['active', 'hidden'], default: 'active' },
  image: String,
  metadata_title: String,
  metadata_description: String,
  metadata_url: String,
  show_in: {
    app: { type: Boolean, default: false }
  },
  translations: {
    en: {
      name: String,
      metadata_title: String,
      metadata_description: String,
      metadata_url: String
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
