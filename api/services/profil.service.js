// 
const Profil = require('../models/profil.model');
const User = require('../models/user.model');
const logger = require('../services/private/logger.service');

// Handle index actions

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