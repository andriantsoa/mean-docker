const OffreModel = require('../models/offre.model');
const EntrepriseModel = require('../models/entreprise.model');
const { query } = require('./private/logger.service');
// Handle index actions


const buildFilter = () => {
  const search = 'A';
  const salaire = 1000;
  const competences = [search]
  const status = [search]

  const filters = {
    param: {
      $and: [
        {
          $or: [
            { city: { $regex: search, $options: 'i' } },
            { titre: { $regex: search, $options: 'i' } },
            { status: { $in: status } }
          ]
        },
        {
          online: { $exists: true },
          boosted: { $exists: true },
          validated: { $exists: true }
        },
        {
          $or: [
            { salaire: { $lt: salaire } },
            { status: { $in: status } },
            {
              'competences.titre': { $in: competences },
            }
          ]
        }
      ]
    },
    limit: 5
  };
};

const getOffres = async (filters) => {
  let { param, projection, limit, offset } = filters;
  console.log('param', param);
  return await OffreModel.find(param, projection).limit(limit)
    .populate({
      path: 'entreprise',
      select: ['nomPublic', 'status', 'presentation', 'mission', 'dateFondation']
    }).lean() || [];
};

exports.getPublicJobOffers = async (req) => {
  // uitilisation des filter , limit, offset, ...
  const query = req.query;
  const limit = parseInt(query.limit, 10) || 10;
  const what = query.what;
  const where = query.where;
  const salaire = query.salaire || 0;
  const competences = []
  const filters = {
    param: {
      $and: [
        {
          $or: [
            { city: { $regex: where, $options: 'i' } },
            { titre: { $regex: what, $options: 'i' } }
          ]
        },
        {
          online: { $exists: true },
          validated: { $exists: true }
        }
      ]
    },
    limit
  };

  const offres = await getOffres(filters);
  return { data: offres, message: 'Liste des offres public' }
};

exports.getPremiumJobOffers = async (req) => {
  const search = '';
  const salaire = 1000;
  const competences = []
  const status = []

  const filters = {
    param: {
      $and: [
        {
          $or: [
            { city: { $regex: search, $options: 'i' } },
            { titre: { $regex: search, $options: 'i' } },
            { status: { $in: status } }
          ]
        },
        {
          online: { $exists: true },
          boosted: { $exists: true },
          validated: { $exists: true }
        }
      ]
    },
    limit: 5
  };

  const offres = await getOffres(filters);
  return { data: offres, message: 'Liste des offres premium' }
};

exports.getToValidateJobOffers = async (req) => {
  const search = 'A';
  const salaire = 1000;
  const competences = []
  const filters = {
    param: {
      $and: [
        {
          $or: [
            { city: { $regex: search, $options: 'i' } },
            { titre: { $regex: search, $options: 'i' } }
          ]
        },
        {
          validated: { $exists: false }
        }
      ]
    },
    limit: 5
  };

  const offres = await getOffres(filters);
  return { data: offres, message: 'Liste des offres a valider' }
};

exports.createOffreForEntreprise = async (offre, entreprise) => {
  offre.entreprise = entreprise._id;
  const newOffre = new OffreModel(offre);
  const createdOffre = await newOffre.save();
  if (createdOffre._id) {
    entreprise.offres = entreprise.offres ? entreprise.offres : [];
    entreprise.offres.push(createdOffre);
    return await entreprise.save();
  } else {
    return null;
  }
};

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
  if (entrepriseOffres.includes(offre_id)) {
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