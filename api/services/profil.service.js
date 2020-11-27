// 
const Profil = require('../models/profil.model');
const User = require('../models/user.model');
const logger = require('../services/private/logger.service');

// Handle index actions

// exports.createProfil = async (user) => {
//   const profil = new Profil();
//   profil.role = user.role;
//   profil.label = user.username;

//   // save the profil and check for errors
//   return await profil.save((err) => {
//     if (err) {
//       logger.error('sur enregistrement nouveau profil');
//       return {
//         error: err
//       };
//     }
//     user.active = true;
//     user.profils = [profil._id];
//     logger.info('enregistrement nouveau profil ' + profil._id);

//     user.save(function (err) {
//       if (err) {
//         logger.error('sur mis a jour utilisateur');
//         return {
//           error: err
//         };
//       }
//       logger.info('mis a jour utilisateur');
//     });
//     return {
//       profil
//     };
//   });
// };

exports.createProfilforUser = async (user) => {
  const profil = new Profil();
  profil.role = user.role;
  profil.label = user.username;

  const newProfil = await profil.save();
  logger.info('enregistrement nouveau profil ' + newProfil._id);
  if (newProfil._id) {
    user.active = true;
    user.profils = [newProfil._id];
    const updatedUser = await user.save();
    logger.info('mis a jour utilisateur' + updatedUser.profils);
  }
  return newProfil;
};