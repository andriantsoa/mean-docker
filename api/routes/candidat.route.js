var express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// const config = require('../config/config')[env];
// const uploadFolder = config.uploadPath;
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
  .route('/:candidat_id/uploadphoto')
  .get(async (req, res) => {
    // const idCandidat = req.params.candidat_id;
    const list = await documentModel.find({}, (err) => {
      if (err) return console.log(err)
    });
    console.log(list);
    res.json({
      photos: list
    });
  })
  .post(
    upload.single('picture'), // upload single file
    candidatController.addFileOK
  );
router
  .route('/:candidat_id/document/:document_id')
  .get(async (req, res) => {
    const idDoc = req.params.document_id;
    const document = await documentModel.findById(idDoc, (err) => {
      if (err) return console.log(err)
    });
    console.log(document);
    if (document) {
      try {
        const uploadFolderPath = `E:/CRH/mean-docker-app/frontend/src/assets/uploads`;
        res.sendFile(path.resolve(`${uploadFolderPath}/${document.url}`));
      } catch (err) {
        console.error(err);
        res.sendStatus(400);
      }
    }
  })
/* Delete file */
// .delete(async (req, res, next) => {
//   const file = uploadFolder + req.params.fileName;
//   fs.stat(file, function (err, stats) {
//     if (err) {
//       console.error(err);
//       return res.sendStatus(400);
//     }

//     fs.unlink(file, function (err) {
//       if (err) {
//         console.error(err);
//         return res.sendStatus(400);
//       }
//       res.send({
//         status: "200",
//         response: "File is deleted!"
//       });
//     });
//   });
// });

module.exports = router;