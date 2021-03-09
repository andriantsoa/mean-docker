const CandidatModel = require('../models/candidat.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
// Handle index actions

exports.createCandidat = async (profil, newProfil) => {
  const candidat = new CandidatModel();
  candidat.metier = newProfil.label;
  candidat.status = newProfil.status;
  const candidatCreated = await candidat.save();
  if (candidat._id) {
    profil.candidat = candidatCreated._id;
    profil.secteur = newProfil.secteur;
    profil.label = newProfil.label;
    profil.status = newProfil.status;
    profil.role = newProfil.role;
    profil.groupe = newProfil.groupe;
    const profilUpdated = await profil.save();
    return profilUpdated;
  } else {
    return null;
  }
};

exports.getProfilById = async (profil_id) => {
  return await Profil.findById(profil_id);
};

exports.getCandidatById = async (id) => {
  const candidat = await CandidatModel.findById(id);
  if (!candidat || !candidat._id) {
    return { status: 400, message: 'Candidat introuvable' };
  }
  return { data: candidat, message: 'Details sur le candidat' };
};

exports.updateCandidat = async (candidat_id, body) => {
  const candidat = await CandidatModel.findByIdAndUpdate(candidat_id, body, { new: true });
  if (candidat && candidat._id) {
    return { data: candidat, message: 'Candidat mis à jour' };
  } else {
    return { status: 400, message: 'Candidat introuvable' };
  }
};

exports.deleteCandidat = async (candidat_id) => {
  return await CandidatModel.remove({
    _id: candidat_id
  }, (error, candidat) => {
    if (error) return { status: 400, message: 'Candidat introuvable', error };
    return { data: true, message: 'Candidat supprimé' };
  }
  );
};