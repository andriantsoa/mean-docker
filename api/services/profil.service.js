// 
const Profil = require('../models/profil.model');
const User = require('../models/user.model');
const mailService = require('../services/private/mail.service');

// Handle index actions

exports.createProfil = async (user) => {
  const profil = new Profil();
  profil.role = user.role;
  profil.label = user.username;

  // save the profil and check for errors
  await profil.save((err) => {
    if (err) {
      return {
        error: err
      };
    }
    user.active = true;
    user.profils = [profil._id];
    user.save(function (err) {
      if (err) {
        console.log(err);
        return {
          error: err
        };
      }
      mailService.sendMailSimple('andryrandriadev@gmail.com', '[ASAKO] Compte validé', 'Votre compte a été validé');
      return {
        profil
      };
    });
  });
};