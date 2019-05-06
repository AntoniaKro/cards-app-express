const mongoose = require('mongoose');
//Schema ist eine Klasse von mongoose
const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    get: value => value.toUpperCase()
  },
  category: {
    type: String,
    set: value => value.toLowerCase()
  },
  description: {
    type: String,
    default: 'No description yet'
  }
});

module.exports = mongoose.model('Card', cardSchema);
