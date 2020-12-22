const OffreModel = require('../models/offre.model');
const EntrepriseModel = require('../models/entreprise.model');
// Handle index actions

// exports.createOffreForEntreprise = async (offre, entreprise) => {
//   const newOffre = new OffreModel(offre);
//   const createdOffre = await newOffre.save();
//   if (createdOffre._id) {
//     entreprise.offres = entreprise.offres ? entreprise.offres : [];
//     entreprise.offres.push(createdOffre);
//     return await entreprise.save();
//   } else {
//     return null;
//   }
// };

exports.getOffreEntrepriseById = async (entreprise_id, offre_id) => {
  const entreprise = await EntrepriseModel.findById(entreprise_id);
  if (!entreprise || !entreprise._id) {
    return { status: 400, message: 'Offre introuvable' };
  }
  const entrepriseOffres = entreprise.offres;
  if (entrepriseOffres.contains(offre_id)) {
    const offre = await this.getOffreById(offre_id);
    return { data: offre, message: 'Details complet sur le offre' };
  } else {
    return { status: 403, message: 'Offre non accessible' };
  }
};

exports.getOffreById = async (offre_id) => {
  const offre = await OffreModel.findById(offre_id, {
    codeOffre: 1,
    description: 1,
    online: 1,
    dateLimit: 1,
    city: 1,
    dateDebut: 1,
    duree: 1,
    salaire: 1,
    titreOffre: 1,
    status: 1,
    competences: 1,
    formations: 1,
    avantages: 1
  });
  if (!offre || !offre._id) {
    return { status: 400, message: 'Offre introuvable' };
  }
  return { data: offre, message: 'Details sur le offre' };
};

exports.updateOffreEntreprise = async (entreprise_id, offre_id, body) => {
  const entreprise = await EntrepriseModel.findById(entreprise_id);
  if (!entreprise || !entreprise._id) {
    return { status: 400, message: 'Offre introuvable' };
  }
  const entrepriseOffres = entreprise.offres;
  if (entrepriseOffres.contains(offre_id)) {
    const offre = await OffreModel.findByIdAndUpdate(offre_id, body, { new: true });
    if (offre && offre._id) {
      return { data: offre, message: 'Offre mis à jour' };
    } else {
      return { status: 400, message: 'Offre introuvable' };
    }
  } else {
    return { status: 403, message: 'Offre non accessible' };
  }
};

exports.deleteOffreEntreprise = async (entreprise_id) => {
  return await OffreModel.remove({
    _id: entreprise_id
  }, (error, entreprise) => {
    if (error) return { status: 400, message: 'Offre introuvable', error };
    return { data: true, message: 'Offre supprimé' };
  }
  );
};