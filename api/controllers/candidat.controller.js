// userController.js
// Import candidat model
const fs = require('fs-extra');
const path = require('path');

const responseHandler = require('./response-handler');
const candidatService = require('../services/candidat.service');
const candidatModel = require('../models/candidat.model');
const documentModel = require('../models/document.model');
const mailService = require('../services/private/mail.service');
const catDoc = require('../models/constants/cat-doc');

// Handle index actions

exports.index = async (req, res) => {
  await candidatModel.get((error, candidats) => {
    if (error) {
      responseHandler.handleError(res, error, 400);
    }
    responseHandler.handleDataAndMessage(res, candidats, 'liste des candidats');
  });
};

// Handle view candidat info
exports.view = async (req, res) => {
  const result = await candidatService.getCandidatById(req.params.candidat_id);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

// Handle update candidat info
exports.update = async (req, res) => {
  const result = await candidatService.updateCandidat(req.params.candidat_id, req.body);
  if (result && result.data) {
    responseHandler.handleDataAndMessage(res, result.data, result.message);
    const email = 'andryrandriadev@gmail.com';
    const subject = '[APP] Mise à jour de votre profil de candidat';
    const text = 'Bonjour, Votre profil de candidat a été modifié avec succès, Bien cordialement, ARTI PROJECT';
    mailService.sendMailSimple(email, subject, text);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

// Handle delete candidat
exports.delete = async (req, res) => {
  const result = await candidatService.deleteCandidat(req.params.candidat_id);
  if (result && result.data) {
    responseHandler.handleMessage(res, result.message);
  } else {
    responseHandler.handleError(res, result.error, result.status, result.message);
  }
};

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

exports.addFileOK = async (req, res) => {
  console.log('files-----------', req.files);
  console.log('body---------', req.body);
  console.log('data-----', req.files.file.data);
  const folderPath = `E:/CRH/mean-docker-app/frontend/src/assets/uploads`;
  const splitedName = req.files.file.name.split('-')
  const categorie = splitedName[0] || 'CV';
  const filename = splitedName[1];
  const url = `${req.params.candidat_id}/${filename}`;
  const filePath = `${folderPath}/${url}`;
  await fs.outputFile(filePath, req.files.file.data)
    .then(() => fs.readFile(filePath, 'utf8'))
    .then(data => {
      const encode_image = data.toString('base64');
      const fileParam = {
        size: req.files.file.size,
        mimetype: req.files.file.mimetype,
        image: new Buffer.from(encode_image),
        categorie: catDoc[categorie] || 1,
        url: url,
        title: filename
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

// exports.addDocument = (req, res, next) => {
//   if (!req.file) {
//     return res.status(500).send({ message: 'Upload fail' });
//   } else {
//     req.body.imageUrl = 'http://127.0.0.1:3000/images/' + req.file.filename;
//     documentModel.create(req.body, function (err, document) {
//       if (err) {
//         console.log(err);
//         return next(err);
//       }
//       res.json(document);
//     });
//   }
// };

// exports.addCandidatFile = (req, res, next) => {
//   console.log('request', req);
//   if (!req.file) {
//     return res.status(500).send({ message: 'Upload fail' });
//   } else {
//     console.log(req.files); // list of the files
//     console.log(req.body); // request body, like email

//     let file = req.files.image;

//     file.mv(file.name, function (err, success) {
//       return res.json({ success: true });
//     });

//     documentModel.create(req.body, function (err, document) {
//       if (err) {
//         console.log(err);
//         return next(err);
//       }
//       res.json(document);
//     });
//   }
// };

// https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088
// exports.myUploadFunction = (req, res) => {
//   const multer = require('multer');

//   const path = require('path');
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, process.env.UPLOAD_FOLDER);
//     },
//     filename: function (req, file, cb) {
//       cb(null, path.extname(file.originalname));
//     }
//   });

//   // Treat posted file
//   const upload = multer({ storage: storage }).fields([
//     { name: 'myImage', maxCount: 1 },
//   ]);

//   upload(req, res, function (err) {
//     if (err) {
//       console.log(err);
//     }

//     // Get posted data:
//     const obj = {
//       title: req.body.title,
//       categorie: req.body.categorie
//     };

//     // ...
//   });
// };


