// userController.js
// Import profil model
const Candidat = require('../models/candidat.model');
const User = require('../models/user.model');
const responseHandler = require('./response-handler');
// Handle index actions

exports.index = function (req, res) {
  Candidat.get(function (err, profils) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }
    responseHandler.handleDataAndMessage(res, profils, 'liste des candidats');
  });
};

// Handle view profil info
exports.view = function (req, res) {
  Candidat.findById(req.params.profil_id, function (err, profil) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }
    responseHandler.handleDataAndMessage(res, profil, 'detail sur le candidat');
  });
};

// Handle update profil info
exports.update = function (req, res) {
  Candidat.findByIdAndUpdate(req.params.profil_id, req.body, { new: true }, function (
    err,
    profil
  ) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }
    responseHandler.handleDataAndMessage(res, profil, 'mis a jour effectué sur le candidat');
  });
};

// Handle delete profil
exports.delete = function (req, res) {
  Candidat.remove(
    {
      _id: req.params.profil_id
    },
    function (err, profil) {
      if (err) {
        responseHandler.handleError(res, err, 400);
      }
      responseHandler.handleMessage(res, 'Candidat supprimé');
    }
  );
};


