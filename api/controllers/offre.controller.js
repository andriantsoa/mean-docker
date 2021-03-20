// userController.js
// Import entreprise model
const responseHandler = require('./response-handler');
const offreModel = require('../models/offre.model');
const offreService = require('../services/offre.service');
const mailService = require('../services/private/mail.service');

exports.index = async (req, res) => {
  await offreModel.get((error, offres) => {
    if (error) {
      responseHandler.handleError(res, error, 400);
    }
    responseHandler.handleDataAndMessage(res, offres, 'liste des offres de l\'entreprise');
  });
};

exports.publicJobOffers = async (req, res) => {
  const result = await offreService.getPublicJobOffers(req);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

exports.premiumJobOffers = async (req, res) => {
  const result = await offreService.getPremiumJobOffers(req);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

exports.toValidateJobOffers = async (req, res) => {
  const result = await offreService.getToValidateJobOffers(req);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

exports.publicJobOffers = async (req, res) => {
  // const filters = {};
  const result = await offreService.getPublicJobOffers(req);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

exports.viewFull = async (req, res) => {
  const result = await offreService.getOffreEntrepriseById(req.params.entreprise_id, req.params.offre_id);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

exports.view = async (req, res) => {
  const result = await offreService.getOffreById(req.params.offre_id);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

exports.update = async (req, res) => {
  const result = await offreService.updateOffreEntreprise(req.params.entreprise_id, req.params.offre_id, req.body);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
    const email = 'andryrandriadev@gmail.com';
    const subject = '[APP] Mise à jour de votre offre de entreprise';
    const text = 'Bonjour, Votre offre de entreprise a été modifié avec succès, Bien cordialement, ARTI PROJECT';
    mailService.sendMailSimple(email, subject, text);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

exports.delete = async (req, res) => {
  const result = await offreService.deleteOffreEntreprise(req.params.entreprise_id);
  if (result && result.data) {
    responseHandler.handleMessage(res, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

// exports.offer = async (req, res) => {
//   const offre = req.body
//   const result = await entrepriseService.makeOffre(req.params.entreprise_id, offre);
//   if (result && result.data) {
//     responseHandler.handleDataAndMessage(res, result.data, result.message);
//     const email = 'andryrandriadev@gmail.com';
//     const subject = '[APP] Une offre a été créée pour votre entreprise';
//     const text = 'Bonjour, Votre offre a été créée avec succès pour votre entreprise, Bien cordialement, ARTI PROJECT';
//     mailService.sendMailSimple(email, subject, text);
//   } else {
//     responseHandler.handleError(res, result.error, result.status, result.message);
//   }
// };
