var express = require('express');
const router = express.Router();

const candidatController = require('../controllers/candidat.controller');
const logger = require('../services/private/logger.service');
const uploader = require('../config/multer-uploader');
const upload = uploader.upload;

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
    candidatController.addCandidatFile
  );


module.exports = router;