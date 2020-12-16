const User = require('../models/user.model');
const userService = require('../services/user.service');
const mailService = require('../services/private/mail.service');
const responseHandler = require('./response-handler');
const logger = require('../services/private/logger.service');

exports.index = function (req, res) {
  User.get(function (err, users) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }
    responseHandler.handleDataAndMessage(res, users, 'liste des utilisateurs');
  });
};

// Handle create user actions
exports.new = async (req, res) => {
  const result = await userService.createUser(req.body);
  console.log(result);
  logger.info(`creation utilisateur`);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
    const email = 'andryrandriadev@gmail.com';
    const subject = '[APP] Votre compte a été créé';
    const text = `Bonjour ${result.data.username},
      Votre compte a été validé.
      Il vous reste à confirmer son activation sur l'url suivant:
      http://localhost:4200/dashboard/validation?validationKey=${result.data.codeActivation}`;
    await mailService.sendMailSimple(email, subject, text);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

// Handle view user info
exports.view = (req, res) => {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }
    responseHandler.handleDataAndMessage(res, user, 'Detail sur l\'utilisateur');
  });
};

// Handle update user info
exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.user_id, req.body, { new: true }, function (
    err,
    user
  ) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }
    responseHandler.handleDataAndMessage(res, user, 'Utilisateur mis a jour');
  });
};

// Handle delete user
exports.delete = (req, res) => {
  User.remove(
    {
      _id: req.params.user_id
    },
    (err, user) => {
      if (err) {
        responseHandler.handleError(res, err, 400);
      }
      responseHandler.handleMessage(res, 'Utilisateur mis a jour');
    }
  );
};

exports.authenticate = async (req, res) => {
  const result = await userService.authenticate(req.body);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

exports.changePassword = (req, res) => {
  const result = userService.changePassword(req);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

exports.validate = async (req, res) => {
  const result = await userService.validate(req);
  // console.log('validation controller', validation);
  if (result.validated == true) {
    responseHandler.handleMessage(res, 'Compte utilisateur activé pour ' + result.user.username);
    const email = 'andryrandriadev@gmail.com';
    const subject = '[APP] Compte validé ' + result.user.username;
    const text = 'Votre compte a été validé';
    await mailService.sendMailSimple(email, subject, text);
  } else if (validated == false) {
    responseHandler.handleError(res, 'Mail non envoyé : Probleme de données', 400);
  } else {
    responseHandler.handleError(res, 'Mail non envoyé : activation non autorisé', 403);
  }
};
