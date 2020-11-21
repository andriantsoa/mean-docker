const Candidat = require('../models/candidat.model');
const Profil = require('../models/profil.model');
const mailService = require('../services/private/mail.service');
// Handle index actions

exports.createCandidat = async (profil, newProfil) => {
  const candidat = new Candidat();
  candidat.metier = newProfil.label;
  candidat.status = newProfil.status;
  console.log('candidat', candidat);
  console.log('profil', profil);

  candidat.save((err) => {
    if (err) {
      console.log('error', err);
    }
    profil.candidat = candidat._id;
    profil.secteur = newProfil.secteur;
    profil.label = newProfil.label;
    profil.status = newProfil.status;
    profil.role = newProfil.role;
    profil.groupe = newProfil.groupe;
    profil.save((err) => {
      if (err) {
        console.log('error', err);
      }
      mailService.sendMailSimple('andryrandriadev@gmail.com', '[ASAKO] Compte validé', 'Votre compte a été validé');
      return {
        candidat
      };
    });
  });
};