// user.model.js
const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const STATUS = require('./constants/status');

const competence = new Schema({
  titre: { type: String },
  niveau: { type: Number },
  version: { type: String },
  _id: false
});

const formation = new Schema({
  titre: { type: String, required: true },
  filiere: [String],
  niveau: { type: String, required: true },
  etablissement: { type: String, required: true },
  debut: { type: String },
  fin: { type: String },
  _id: false
});

// Setup schema
const offreSchema = new Schema({
  codeOffre: String,
  description: String,
  online: Boolean,
  boosted: Boolean,
  dateLimit: String,
  city: String,
  dateDebut: String,
  duree: String,
  salaire: Number,
  titreOffre: {
    type: String,
    required: true
  },
  status: {
    type: STATUS,
    default: STATUS.SALARIE_CDI,
    required: true
  },
  entreprise: {
    type: ObjectId,
    ref: 'entreprise'
  },
  listeCandidats: [{
    type: ObjectId,
    ref: 'profil'
  }],
  competences: [competence],
  formations: [formation],
  avantages: [String]
}, {
  timestamps: true
});

// Export Profil model
const Offre = (module.exports = mongoose.model('offre', offreSchema));

module.exports.get = function (callback, limit) {
  Offre.find(callback).limit(limit);
};
