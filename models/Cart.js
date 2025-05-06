const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  status: String,
  success: String,
  data: [
    {
      total: {
        amount: Number,
        currency: String
      },
      subtotal: {
        amount: Number,
        currency: String
      },
      total_discount: {
        amount: Number,
        currency: String
      },
      checkout_url: String,
      age_in_minutes: Number,
      created_at: {
        date: String,
        timezone_type: Number,
        timezone: String
      },
      updated_at: {
        date: String,
        timezone_type: Number,
        timezone: String
      },
      customer: {
        id: Number,
        name: String,
        mobile: String,
        email: String,
        avatar: String,
        country: String,
        city: String
      },
      coupon: {
        id: Number,
        code: String,
        status: String,
        type: String,
        amount: {
          amount: Number,
          currency: String
        },
        minimum_amount: {
          amount: Number,
          currency: String
        },
        expiry_date: String,
        created_at: {
          date: String,
          timezone_type: Number,
          timezone: String
        }
      },
      items: [
        {
          id: Number,
          product_id: Number,
          quantity: Number,
          weight: Number,
          amounts: {
            price_without_tax: {
              amount: Number,
              currency: String
            },
            total_discount: {
              amount: Number,
              currency: String
            },
            tax: {
              percent: String,
              amount: {
                amount: Number,
                currency: String
              }
            },
            total: {
              amount: Number,
              currency: String
            }
          },
          notes: String
        }
      ]
    }
  ],
  pagination: {
    count: Number,
    total: Number,
    perPage: Number,
    currentPage: Number,
    totalPages: Number,
    links: {
      next: String,
      previous: String
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
