// userController.js
// Import user model
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userService = require('../services/user.service');
const mailService = require('../services/private/mail.service');

const responseHandler = require('./response-handler');
// const responder = require('../middle/response.middle');
// Handle index actions

/**
 * 
 * ATTENTION : ENLEVER LES ACCESS BASES DE DONNEES DANS LE CONTROLLER
 * LES FAIRE DANS SERVICE
 * 
 * 
 */
const environment = require('../config/environment');

exports.index = function (req, res) {
  User.get(function (err, users) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }
    responseHandler.handleDataAndMessage(res, users, 'liste des utilisateurs');
  });
};

// Handle create user actions
exports.new = function (req, res) {
  User.find({ username: req.body.username.trim() }, function (err, users) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }
    if (users && users.length > 0) {
      responseHandler.handleError(res, err, 400, 'utilisateur n\'est plus disponible');
    } else {
      const user = new User(req.body);
      user.active = false;
      user.codeActivation = userService.generateActivationCode();
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
      }

      // save the user and check for errors
      user.save(function (err) {
        if (err) {
          responseHandler.handleError(res, err, 400);
        }
        responseHandler.handleDataAndMessage(res, user, 'Utilisateur créé');
      });
    }
  });
};

// Handle view user info
exports.view = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }
    responseHandler.handleDataAndMessage(res, user, 'Detail sur l\'utilisateur');
  });
};

// Handle update user info
exports.update = function (req, res) {
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
exports.delete = function (req, res) {
  User.remove(
    {
      _id: req.params.user_id
    },
    function (err, user) {
      if (err) {
        responseHandler.handleError(res, err, 400);
      }
      responseHandler.handleMessage(res, 'Utilisateur mis a jour');
    }
  );
};

exports.authenticate = (req, res) => {
  const result = userService.authenticate(req.body);
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
  console.log('validation controller', validation);
  if (result.validated == true) {
    responseHandler.handleMessage(res, 'Compte utilisateur activé pour ' + result.user.username);
    await mailService.sendMailSimple('andryrandriadev@gmail.com', '[ASAKO] Compte validé ' + result.user.username, 'Votre compte a été validé');
  } else if (validated == false) {
    responseHandler.handleError(res, 'Mail non envoyé : Probleme de données', 400);
  } else {
    responseHandler.handleError(res, 'Mail non envoyé : activation non autorisé', 403);
  }
};
