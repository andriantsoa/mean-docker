const DocumentModel = require('../models/document.model');
const fs = require('fs-extra');
const catDoc = require('../models/constants/cat-doc');

const saveFile = async (finalImg, res) => {
  const file = new DocumentModel(finalImg);
  return await file.save((err, result) => {
    console.log(result)
    if (err) {
      return console.log(err);
    }
  });
};

exports.addDocumentOK = async (req, res) => {
  const folderPath = `E:/CRH/mean-docker-app/frontend/src/assets/uploads`;
  const splitedName = req.files.file.name.split('-')
  const categorie = splitedName[0] || 'CV';
  const filename = splitedName[1];
  const url = `${req.params.candidat_id}/${filename}`;
  const filePath = `${folderPath}/${url}`;
  await fs.outputFile(filePath, req.files.file.data)
    .then(() => fs.readFile(filePath, 'utf8'))
    .catch(err => {
      console.error(err);
      throw new Error('Candidat introuvable');
    });
  const fileParam = {
    size: req.files.file.size,
    mimetype: req.files.file.mimetype,
    // image: new Buffer.from(encode_image),
    categorie: catDoc[categorie] || 1,
    url: url,
    title: filename,
    candidat: req.params.candidat_id,
    entreprise: req.params.entreprise_id
  };
  const newFile = await saveFile(fileParam, res);
  return {
    data: {
      file: newFile, saved: true
    }, message: 'Nouveau document ajouté'
  };

};