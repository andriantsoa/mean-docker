const CandidatModel = require('../models/candidat.model');
const DocumentModel = require('../models/document.model');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const saveFile = (finalImg, res) => {
  const file = new documentModel(finalImg);
  file.save((err, result) => {
    console.log(result)
    if (err) {
      return console.log(err);
    }
    console.log('saved to database');
    console.log('send  file', result);
    res.json({
      file: result,
      saved: !!result
    });
  });
};

exports.createDocument = async (req, res) => {
  const folderPath = `E:/CRH/mean-docker-app/api/ressources/upload`;
  const url = `${req.params.candidat_id}/${req.files.file.name}`;
  const filePath = `${folderPath}/${url}`;
  await fs.outputFile(filePath, req.files.file.data)
    .then(() => fs.readFile(filePath, 'utf8'))
    .then(data => {
      const encode_image = data.toString('base64');
      const fileParam = {
        mimetype: req.files.mimetype,
        image: new Buffer.from(encode_image),
        categorie: req.body.categorie,
        url: url,
        title: req.body.title
      };
      saveFile(fileParam, res);
    })
    .catch(err => {
      console.error(err)
      res.json({
        saved: false
      });
    });
};