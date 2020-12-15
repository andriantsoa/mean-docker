// userController.js
// Import entreprise model
const responseHandler = require('./response-handler');
const entrepriseService = require('../services/entreprise.service');
const mailService = require('../services/private/mail.service');

// Handle index actions

exports.index = (req, res) => {
  CandidatModel.get((error, entreprises) => {
    if (error) {
      responseHandler.handleError(res, error, 400);
    }
    responseHandler.handleDataAndMessage(res, entreprises, 'liste des entreprises');
  });
};

// Handle view entreprise info
exports.view = async (req, res) => {
  const result = await entrepriseService.getCandidatById(req.params.entreprise_id);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

// Handle update entreprise info
exports.update = async (req, res) => {
  const result = await entrepriseService.updateCandidat(req.params.entreprise_id, req.body);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
    const email = 'andryrandriadev@gmail.com';
    const subject = '[APP] Mise à jour de votre profil de entreprise';
    const text = 'Bonjour, Votre profil de entreprise a été modifié avec succès, Bien cordialement, ARTI PROJECT';
    mailService.sendMailSimple(email, subject, text);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

// Handle delete entreprise
exports.delete = async (req, res) => {
  const result = await entrepriseService.deleteCandidat(req.params.entreprise_id);
  if (result && result.data) {
    responseHandler.handleMessage(res, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};
