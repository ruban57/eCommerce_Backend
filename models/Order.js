const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  referenceId: Number,
  customer: {
    firstName: String,
    lastName: String,
    mobile: Number,
    mobileCode: String,
    email: String,
    country: String,
    avatar: String
  },
  items: [
    {
      name: String,
      sku: String,
      quantity: Number,
      weight: Number,
      amounts: {
        priceWithoutTax: Number,
        totalDiscount: Number,
        tax: Number,
        total: Number
      },
      product: {
        id: Number,
        type: String,
        promotion: {
          title: String,
          subTitle: String
        },
        status: String,
        isAvailable: Boolean,
        name: String,
        price: Number,
        salePrice: Number,
        url: String,
        thumbnail: String,
        calories: String,
        mpn: String,
        gtin: String
      }
    }
  ],
  amounts: {
    subTotal: Number,
    shippingCost: Number,
    taxPercent: Number,
    taxAmount: Number,
    total: Number
  },
  paymentMethod: String,
  currency: String,
  status: {
    id: Number,
    name: String,
    slug: String
  },
  urls: {
    customer: String,
    admin: String
  },
  createdAt: Date
});

module.exports = mongoose.model('Order', orderSchema);
