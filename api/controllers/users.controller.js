// userController.js
// Import user model
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const profilService = require('../services/profil.service');
const userService = require('../services/user.service');
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

exports.authenticate = function (req, res) {
  User.findOne({ email: req.body.username }, function (err, user) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      // authentication successful
      user.token = jwt.sign({ sub: user._id }, environment.secret, {
        algorithm: 'HS256'
      });
      delete user.password;
      const data = {
        city: user.city,
        notifications: user.notifications,
        role: user.role,
        token: user.token,
        username: user.username,
        profils: user.profils,
        active: user.active,
        _id: user._id
      };
      responseHandler.handleDataAndMessage(res, data, 'Connexion avec succes');
    } else {
      // authentication failed
      responseHandler.handleError(res, err, 401, 'Erreur sur la connexion');
    }
  });
};

exports.changePassword = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) {
      responseHandler.handleError(res, err, 400);
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      // authentication successful
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
      }
      user.save(function (err) {
        if (err) responseHandler.handleError(res, err, 400);
        responseHandler.handleMessage(res, 'Mot de passe mis a jour');
      });
    } else {
      // authentication failed
      responseHandler.handleError(res, err, 401, 'ancien mot de pass ne correspond pas');
    }
  });
};

exports.validate = function (req, res) {
  if (req.body && req.body.validationKey && req.body.username) {
    const key = req.body.validationKey;
    const username = req.body.username;
    User.findOne({ username, codeActivation: key }, async (err, user) => {
      if (err || !user) {
        responseHandler.handleError(res, err, 400);
      } else {
        await profilService.createProfil(user);
        responseHandler.handleMessage(res, 'Compte utilisateur activé');
      }
    });
  } else {
    responseHandler.handleError(res, err, 403, 'activation non autorisé');
  }
};
