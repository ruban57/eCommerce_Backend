const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  mobile: String,
  mobile_code_country: String,
  gender: String,
  birthday: Date,
  email: { type: String, unique: true },
  password: String,
  groups: [String],
  avatar: String,
  city: String,
  country: String,
  location: String,
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
