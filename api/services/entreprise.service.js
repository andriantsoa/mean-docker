const EntrepriseModel = require('../models/entreprise.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
// Handle index actions

exports.createEntreprise = async (profil, newProfil) => {
  const entreprise = new EntrepriseModel();
  entreprise.metier = newProfil.label;
  entreprise.status = newProfil.status;
  const entrepriseCreated = await entreprise.save();
  if (entreprise._id) {
    profil.entreprise = entrepriseCreated._id;
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

exports.getEntrepriseById = async (id) => {
  const entreprise = await EntrepriseModel.findById(id);
  if (!entreprise || !entreprise._id) {
    return { status: 400, message: 'Entreprise introuvable' };
  }
  return { data: entreprise, message: 'Details sur le entreprise' };
};

exports.updateEntreprise = async (entreprise_id, body) => {
  const entreprise = await EntrepriseModel.findByIdAndUpdate(entreprise_id, body, { new: true });
  if (entreprise && entreprise._id) {
    return { data: entreprise, message: 'Entreprise mis à jour' };
  } else {
    return { status: 400, message: 'Entreprise introuvable' };
  }
};

exports.deleteEntreprise = async (entreprise_id) => {
  return await EntrepriseModel.remove({
    _id: entreprise_id
  }, (error, entreprise) => {
    if (error) return { status: 400, message: 'Entreprise introuvable', error };
    return { data: true, message: 'Entreprise supprimé' };
  }
  );
};