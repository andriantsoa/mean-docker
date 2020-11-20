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

const experience = new Schema({
  entreprise: { type: String },
  competence: [competence],
  duree: { type: Number },
  debut: { type: String },
  fin: { type: String },
  secteur: [String],
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
const candidatSchema = new Schema({

  posteActuel: String,
  presentation: String,
  disponible: Boolean,
  metier: {
    type: String,
    required: true
  },
  status: {
    type: STATUS,
    default: STATUS.ETUDIANT,
    required: true
  },
  experiences: [experience],
  competences: [competence],
  aspirations: [String],
  formations: [formation],
  demandes: [{
    type: ObjectId,
    ref: 'demande'
  }],
  offres: [{
    type: ObjectId,
    ref: 'offre'
  }]
}, {
  timestamps: true
});

// Export Profil model
const Candidat = (module.exports = mongoose.model('candidat', candidatSchema));

module.exports.get = function (callback, limit) {
  Candidat.find(callback).limit(limit);
};
