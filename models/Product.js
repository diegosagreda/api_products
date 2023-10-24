const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  precio_base: {
    type: Number,
    required: true
  },
  existencia: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Product', ProductSchema);
