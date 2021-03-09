var express = require('express');
const router = express.Router();

const multer = require('multer');
fs = require('fs-extra');

const candidatController = require('../controllers/candidat.controller');
const logger = require('../services/private/logger.service');
const documentModel = require('../models/document.model');

// const uploader = require('../config/multer-uploader');
// const upload = uploader.upload;

// const saveFile = (url, encode_image, req, res) => {
//   const finalImg = {
//     contentType: req.files.mimetype,
//     image: new Buffer.from(encode_image),
//     categorie: req.body.categorie,
//     imageUrl: url,
//     imageTitle: req.body.title,
//     imageDesc: '',
//   };
//   const file = new documentModel(finalImg);
//   return file.save((err, result) => {
//     console.log(result)
//     if (err) return console.log(err)
//     console.log('saved to database')
//   });
// };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

router
  .route('/')
  .get(candidatController.index)
router
  .route('/:candidat_id')
  .get(candidatController.view)
  .patch(candidatController.update)
  .put(candidatController.update);
router
  .route('/:candidat_id/documents')
  .post(
    upload.single('file'),
    candidatController.addDocument
  );

// receive formData
router
  .route('/:candidat_id/file')
  .post(
    upload.single('picture'), // upload single file
    candidatController.addCandidatFile
  );

router
  .route('/:candidat_id/uploadphoto')
  .post(
    upload.single('picture'), // upload single file
    candidatController.addFileOK
    // (req, res) => {
    //   const file = `E:/CRH/mean-docker-app/api/ressources/upload/${req.params.candidat_id}/${req.files.file.name}`;
    //   fs.outputFile(file, req.files.file.data)
    //     .then(() => fs.readFile(file, 'utf8'))
    //     .then(data => {
    //       const encode_image = data.toString('base64');
    //       saveFile(file, encode_image, req, res);
    //       res.json({
    //         saved: true
    //       });
    //     })
    //     .catch(err => {
    //       console.error(err)
    //       res.json({
    //         saved: false
    //       });
    //     });
    // }
  )
  // .get('/:candidat_id/photos', (req, res) => {
  //   documentModel.find().toArray((err, result) => {
  //     const imgArray = result.map(element => element._id);
  //     console.log(imgArray);
  //     if (err) return console.log(err)
  //     res.send(imgArray)
  //   })
  // })
  // .get('/:candidat_id/photo/:id', (req, res) => {
  //   var filename = req.params.id;
  //   documentModel.findOne({ '_id': ObjectId(filename) }, (err, result) => {
  //     if (err) return console.log(err)
  //     res.contentType('image/jpeg');
  //     res.send(result.image.buffer)
  //   })
  // })
  ;

module.exports = router;