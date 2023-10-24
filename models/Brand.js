const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  // Define la estructura de la colección 'Brand'
  // Por ejemplo:
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Brand', brandSchema);
