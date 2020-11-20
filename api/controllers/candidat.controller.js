// userController.js
// Import profil model
const Candidat = require('../models/candidat.model');
// Handle index actions

exports.index = function (req, res) {
  Candidat.get(function (err, profils) {
    if (err) {
      res.status(400).json({
        status: 'error',
        error: 'Bad Request.'
      });
    }
    res.json({
      status: 'success',
      message: 'profils retrieved successfully',
      data: profils
    });
  });
};

// Handle view profil info
exports.view = function (req, res) {
  Candidat.findById(req.params.profil_id, function (err, profil) {
    if (err) {
      res.status(400).json({
        status: 'error',
        error: err
      });
    }
    res.json({
      message: 'Candidat details loading..',
      data: profil
    });
  });
};

// Handle update profil info
exports.update = function (req, res) {
  Candidat.findByIdAndUpdate(req.params.profil_id, req.body, { new: true }, function (
    err,
    profil
  ) {
    if (err) {
      res.status(400).json({
        status: 'error',
        error: err
      });
    }


    res.json({
      message: 'Candidat Info updated',
      data: profil
    });
  });
};

// Handle delete profil
exports.delete = function (req, res) {
  Candidat.remove(
    {
      _id: req.params.profil_id
    },
    function (err, profil) {
      if (err) {
        res.status(400).json({
          status: 'error',
          error: err
        });
      }
      res.json({
        status: 'success',
        message: 'Candidat deleted'
      });
    }
  );
};


