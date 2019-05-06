const mongoose = require('mongoose');
const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    maxlength: 10
  }
});

module.exports = Login = mongoose.model('login', LoginSchema);
