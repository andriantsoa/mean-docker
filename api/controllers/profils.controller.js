// userController.js
// Import profil model
const Profil = require('../models/profil.model');
const candidatService = require('../services/candidat.service');
const profilService = require('../services/profil.service');

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
exports.view = async (req, res) => {
  const profil = await profilService.getProfilById(req.params.profil_id);
  if (profil && profil._id) {
    responseHandler.handleDataAndMessage(res, profil, 'details du profil');
  } else {
    responseHandler.handleError(res, err, 400);
  }
};

// Handle update profil info
exports.update = async (req, res) => {
  const profil = await profilService.updateProfil(req);
  if (profil && profil._id) {
    responseHandler.handleDataAndMessage(res, profil, 'Profil mis à jour');
    const email = 'andryrandriadev@gmail.com';
    const subject = '[ASAKO] Compte validé';
    const text = 'Votre compte a été validé';
    mailService.sendMailSimple(email, subject, text);
  } else {
    responseHandler.handleError(res, err, 400);
  }
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
