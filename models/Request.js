const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequestSchema = new mongoose.Schema({
  cadastro: {
    type: Schema.Types.ObjectId,
    ref: 'cadastro'
  },
  subject_id: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date
  },
  time: {
    type: Date,
    default: Date
  },
  description: {
    type: String,
    require: true
  }
});

module.exports = Request = mongoose.model('request', RequestSchema);
