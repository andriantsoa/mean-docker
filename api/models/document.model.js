// user.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CATEGORIE = require('./constants/cat-doc');

const documentSchema = new Schema({
  categorie: {
    type: Number,
    default: CATEGORIE.CV
  },
  url: String,
  mimetype: String,
  title: String
}, {
  timestamps: true
});

// Export Profil model
const Document = (module.exports = mongoose.model('document', documentSchema));

module.exports.get = function (callback, limit) {
  Document.find(callback).limit(limit);
};
