const CandidatModel = require('../models/candidat.model');
const Candidat = require('../models/candidat.model');
// Handle index actions

exports.createCandidat = async (profil, newProfil) => {
  const candidat = new Candidat();
  candidat.metier = newProfil.label;
  candidat.status = newProfil.status;
  const candidat = await candidat.save();
  if (candidat._id) {
    profil.candidat = candidat._id;
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

exports.getCandidatById = async (id) => {
  return await CandidatModel.findById(id, (error, candidat) => {
    if (error) return { status: 400, message: 'Candidat introuvable', error };
    return { data: candidat, message: 'Details sur le candidat' };
  });
};

exports.updateCandidat = async (candidat_id, body) => {
  return await CandidatModel.findByIdAndUpdate(candidat_id, body, { new: true }, (error, candidat) => {
    if (error) return { status: 400, message: 'Candidat introuvable', error };
    return { data: candidat, message: 'Candidat mis à jour' };
  });
};