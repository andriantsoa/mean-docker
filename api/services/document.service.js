const CandidatModel = require('../models/candidat.model');
const DocumentModel = require('../models/document.model');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
// Handle index actions

const saveFile = (url, encode_image, req) => {
  const finalImg = {
    contentType: req.files.mimetype,
    image: new Buffer.from(encode_image),
    categorie: req.body.categorie,
    imageUrl: url,
    imageTitle: req.body.title,
    imageDesc: '',
  };
  const file = new DocumentModel(finalImg);
  return file.save((err, result) => {
    console.log(result)
    if (err) return console.log(err)
    console.log('saved to database')
  });
};

exports.createDocument = async (req, res) => {
  const file = `E:/CRH/mean-docker-app/api/ressources/upload/${req.params.candidat_id}/${req.files.file.name}`;
  fs.outputFile(file, req.files.file.data)
    .then(() => fs.readFile(file, 'utf8'))
    .then(data => {
      const encode_image = data.toString('base64');
      saveFile(file, encode_image, req);
      res.json({
        saved: true
      });
    })
    .catch(err => {
      console.error(err)
      res.json({
        saved: false
      });
    });
}
  // const candidat = new CandidatModel();
  // candidat.metier = newProfil.label;
  // candidat.status = newProfil.status;
  // const candidatCreated = await candidat.save();
  // if (candidat._id) {
  //   profil.candidat = candidatCreated._id;
  //   profil.secteur = newProfil.secteur;
  //   profil.label = newProfil.label;
  //   profil.status = newProfil.status;
  //   profil.role = newProfil.role;
  //   profil.groupe = newProfil.groupe;
  //   const profilUpdated = await profil.save();
  //   return profilUpdated;
  // } else {
  //   return null;
  // }
};