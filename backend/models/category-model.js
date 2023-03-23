const Mongoose = require('mongoose');

const categorySchema = Mongoose.Schema({

  name: {
    type: String,
    required: true
  }

});

module.exports = Mongoose.model('categories', categorySchema);