// userController.js
// Import candidat model
const fs = require('fs-extra');

const responseHandler = require('./response-handler');
const candidatService = require('../services/candidat.service');
const documentService = require('../services/document.service');
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
    res.json({
      file: result,
      saved: !!result
    });
  });
};

exports.addFileOK = async (req, res, next) => {
  try {
    const resultFile = await documentService.addDocumentOK(req, res);
    if (resultFile && resultFile.data) {
      responseHandler.handleDataAndMessage(res, resultFile.data, resultFile.message);
    } else {
    }
  } catch (error) {
    responseHandler.handleError(res, error.error, error.status, error.message);
  }

  // console.log('files-----------', req.files);
  // const folderPath = `E:/CRH/mean-docker-app/frontend/src/assets/uploads`;
  // const splitedName = req.files.file.name.split('-')
  // const categorie = splitedName[0] || 'CV';
  // const filename = splitedName[1];
  // const url = `${req.params.candidat_id}/${filename}`;
  // const filePath = `${folderPath}/${url}`;
  // await fs.outputFile(filePath, req.files.file.data)
  //   .then(() => fs.readFile(filePath, 'utf8'))
  //   .then(data => {
  //     const encode_image = data.toString('base64');
  //     const fileParam = {
  //       size: req.files.file.size,
  //       mimetype: req.files.file.mimetype,
  //       image: new Buffer.from(encode_image),
  //       categorie: catDoc[categorie] || 1,
  //       url: url,
  //       title: filename,
  //       candidat: req.params.candidat_id
  //     };
  //     saveFile(fileParam, res);
  //   })
  //   .catch(err => {
  //     console.error(err)
  //     res.json({
  //       saved: false
  //     });
  //   });
};
