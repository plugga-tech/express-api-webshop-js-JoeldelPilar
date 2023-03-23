const Mongoose = require('mongoose');

const orderSchema = Mongoose.Schema({

  user: {
    type: Mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  },

  products: [
    {
      productId: {
        type: Mongoose.Types.ObjectId,
        ref: 'products',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]


});

module.exports = Mongoose.model('orders', orderSchema);