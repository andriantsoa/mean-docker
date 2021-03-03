// user.model.js
const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const CATEGORIE = require('./constants/cat-doc');

const documentSchema = new Schema({
  categorie: {
    type: Number,
    default: CATEGORIE.CV
  },
  imageUrl: String,
  imageTitle: String,
  imageDesc: String,
  uploaded: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Export Profil model
const Document = (module.exports = mongoose.model('document', documentSchema));
