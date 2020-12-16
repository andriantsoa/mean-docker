// user.model.js
const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const STATUS = require('./constants/status');

const entrepriseSchema = new Schema({
  immatriculation: String,
  presentation: String,
  nomPublic: {
    type: String,
    required: false
  },
  status: {
    type: STATUS,
    default: STATUS.STARTUP,
    required: false
  },
  nbSalaries: Number,
  mission: String,
  aspirations: [String],
  dateFondation: String,
  demandes: [{
    type: ObjectId,
    ref: 'demande',
    required: false
  }],
  offres: [{
    type: ObjectId,
    ref: 'offre',
    required: false
  }]
}, {
  timestamps: true
});

// Export Profil model
const Entreprise = (module.exports = mongoose.model('entreprise', entrepriseSchema));

module.exports.get = function (callback, limit) {
  Entreprise.find(callback).limit(limit);
};
