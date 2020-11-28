const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const profilService = require('../services/profil.service');
const logger = require('../services/private/logger.service');

exports.generateActivationCode = () => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let part1 = '';
  let part2 = '';
  for (let i = 0; i < 2; i++) {
    part1 += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  for (let i = 0; i < 7; i++) {
    part2 += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return 'ASA' + part1 + part2[0] + '-' + part1[0] + part2;
};

exports.authenticate = (param) => {
  UserModel.findOne({ email: param.username }, (error, user) => {
    if (error) return { status: 400, message: 'Compte introuvable', error };
    if (user && bcrypt.compareSync(param.password, user.password)) {
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
      return { data, message: 'Connexion avec succes' };
    } else {
      return { status: 401, message: 'Erreur sur la connexion', error };
    }
  });
};

exports.validate = async (req) => {
  if (req.body && req.body.validationKey && req.body.username) {
    const key = req.body.validationKey;
    const username = req.body.username;
    const user = await UserModel.findOne({ username, codeActivation: key }, (error, user) => {
      if (error || !user) {
        logger.error('sur recherche utilisateur');
        return { error };
      } else {
        return { user };
      }
    });
    const data = await profilService.createProfilforUser(user);
    console.log('data validation apres creation', data);
    return data && data._id ? { validated: true, user } : { validated: false };
  } else {
    logger.error('requete invalide');
    return null;
  }
};

exports.changePassword = (req) => {
  UserModel.findById(req.params.user_id, (error, user) => {
    if (error) return { status: 400, message: 'Compte introuvable', error };

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      // authentication successful
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
      }
      user.save((error) => {
        if (error) return { status: 400, message: 'Compte introuvable', error };
        return { data: {}, message: 'Mot de passe mis a jour' };
      });
    } else {
      // authentication failed
      return { status: 401, message: 'ancien mot de pass ne correspond pas', error };
    }
  });
};
