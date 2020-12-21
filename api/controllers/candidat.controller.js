// userController.js
// Import candidat model
const responseHandler = require('./response-handler');
const candidatService = require('../services/candidat.service');
const candidatModel = require('../models/candidat.model');
const mailService = require('../services/private/mail.service');

// Handle index actions

exports.index = async (req, res) => {
  await candidatModel.get((error, candidats) => {
    if (error) {
      responseHandler.handleError(res, error, 400);
    }
    responseHandler.handleDataAndMessage(res, candidats, 'liste des candidats');
  });
};

// Handle view candidat info
exports.view = async (req, res) => {
  const result = await candidatService.getCandidatById(req.params.candidat_id);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

// Handle update candidat info
exports.update = async (req, res) => {
  const result = await candidatService.updateCandidat(req.params.candidat_id, req.body);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
    const email = 'andryrandriadev@gmail.com';
    const subject = '[APP] Mise à jour de votre profil de candidat';
    const text = 'Bonjour, Votre profil de candidat a été modifié avec succès, Bien cordialement, ARTI PROJECT';
    mailService.sendMailSimple(email, subject, text);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

// Handle delete candidat
exports.delete = async (req, res) => {
  const result = await candidatService.deleteCandidat(req.params.candidat_id);
  if (result && result.data) {
    responseHandler.handleMessage(res, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};
