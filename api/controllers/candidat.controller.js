// userController.js
// Import candidat model
const responseHandler = require('./response-handler');
const candidatService = require('../services/candidat.service');

// Handle index actions

exports.index = (req, res) => {
  CandidatModel.get((error, candidats) => {
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
