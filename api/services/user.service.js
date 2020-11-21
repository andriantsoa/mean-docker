const UserModel = require('../models/user.model');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const profilService = require('../services/profil.service');

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

exports.validate = function (req) {
  if (req.body && req.body.validationKey && req.body.username) {
    const key = req.body.validationKey;
    const username = req.body.username;
    UserModel.findOne({ username, codeActivation: key }, async (error, user) => {
      if (error || !user) {
        return { error };
      } else {
        await profilService.createProfil(user);
        return { user };
      }
    });
  } else {
    return null;
  }
};
