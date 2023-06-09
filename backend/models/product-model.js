const Mongoose = require('mongoose');

const ProductSchema = Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  lager: {
    type: Number,
    required: true,
  },
  category: {
    type: [Mongoose.Types.ObjectId],
    ref: 'categories',
    required: true,
  }
});

module.exports = Mongoose.model('products', ProductSchema);