const mongoose = require('mongoose');
const CadastroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
});

module.exports = Cadastro = mongoose.model('cadastro', CadastroSchema);
