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
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  }
});

module.exports = Mongoose.model('products', ProductSchema);