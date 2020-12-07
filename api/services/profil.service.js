// 
const Profil = require('../models/profil.model');
const EntrepriseModel = require('../models/entreprise.model');
const CandidatModel = require('../models/candidat.model');
const logger = require('../services/private/logger.service');
const ROLE = require('../models/constants/role');
// Handle index actions

exports.createProfilforUser = async (user) => {
  const profil = new Profil();
  profil.role = user.role;
  profil.label = user.username;
  if (profil.role === ROLE.CANDIDAT) {
    profil.candidat = new CandidatModel();
  } else if (profil.role === ROLE.ENTREPRISE) {
    profil.entreprise = new EntrepriseModel();
  }
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

exports.getProfilById = async (profil_id) => {
  return await Profil.findById(profil_id);
};

exports.updateProfil = async (req) => {
  const profil = await Profil.findById(req.params.profil_id, async (error, profil) => {
    if (error) error;
    return profil;
  });
  const updatedProfil = await candidatService.createCandidat(profil, req.body);
  return updatedProfil;
};