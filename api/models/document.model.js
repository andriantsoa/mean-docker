// user.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const CATEGORIE = require('./constants/cat-doc');

const documentSchema = new Schema({
  url: String,
  mimetype: String,
  title: String,
  size: String,
  categorie: {
    type: Number,
    default: CATEGORIE.CV
  },
  candidat: {
    type: ObjectId,
    ref: 'candidat'
  },
  entreprise: {
    type: ObjectId,
    ref: 'entreprise'
  }
}, {
  timestamps: true
});

// Export Profil model
const Document = (module.exports = mongoose.model('document', documentSchema));

module.exports.get = function (callback, limit) {
  Document.find(callback).limit(limit);
};
