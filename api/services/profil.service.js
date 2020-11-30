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

exports.getProfilById = (profil_id) => {
  Profil.findById(profil_id, (error, profil) => {
    if (error) return null;
    return profil;
  });
};

exports.updateProfil = async (req) => {
  const profil = await Profil.findById(req.params.profil_id, async (error, profil) => {
    if (error) error;
    return profil;
  });
  const updatedProfil = await candidatService.createCandidat(profil, req.body);
  return updatedProfil;
};