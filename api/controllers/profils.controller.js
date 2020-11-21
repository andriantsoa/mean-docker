// userController.js
// Import profil model
const Profil = require('../models/profil.model');
const candidatService = require('../services/candidat.service');
const responseHandler = require('./response-handler');
// Handle index actions

const environment = require('../config/environment');

exports.index = function (req, res) {
  Profil.get(function (err, profils) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }
    responseHandler.handleDataAndMessage(res, profils, 'liste des profils');
  });
};

// Handle view profil info
exports.view = function (req, res) {
  Profil.findById(req.params.profil_id, function (err, profil) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }
    responseHandler.handleDataAndMessage(res, profil, 'details du profil');
  });
};

// Handle update profil info
exports.update = function (req, res) {
  console.log('BODY', req.body);
  Profil.findById(req.params.profil_id, async function (err, profil) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }
    await candidatService.createCandidat(profil, req.body);
    responseHandler.handleDataAndMessage(res, profil, 'Profil mis à jour');
  });
};

// Handle delete profil
exports.delete = function (req, res) {
  Profil.remove(
    {
      _id: req.params.profil_id
    },
    function (err) {
      if (err) {
        responseHandler.handleError(res, err, 400);
      }
      responseHandler.handleMessage(res, 'Profil supprimé');
    }
  );
};

exports.validate = function (req, res) {
  if (req.query && req.query.validationKey) {
    const key = req.query.validationKey;
    Profil.findOne({ token: key }, (err, profil) => {
      if (err) {
        responseHandler.handleError(res, err, 500, 'ne peut pas être validé');
      } else {
        profil.active = true;
        profil.save(function (err) {
          if (err) {
            responseHandler.handleError(res, err);
          }
          responseHandler.handleMessage(res, 'Profil supprimé');
        });
      }
    });
  } else {
    responseHandler.handleError(res, '', 403, 'activation non autorisé');
  }
};
