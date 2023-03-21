const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = Mongoose.model('users', UserSchema);