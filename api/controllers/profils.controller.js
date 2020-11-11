// userController.js
// Import profil model
const Profil = require('../models/profil.model');
// Handle index actions

const environment = require('../config/environment');

exports.index = function (req, res) {
  Profil.get(function (err, profils) {
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

// Handle create profil actions
// exports.new = function (req, res, userId) {
//   User.findById(userId, (err, users) => {
//     if (err) {
//       res.status(400).json({
//         status: 'error',
//         error: 'Bad Request.'
//       });
//     } else if (users && users.length > 0) {
//       const role = users[0].role;
//       const profil = new Profil();
//       profil.role = role;

//       // save the profil and check for errors
//       profil.save(function (err, profilNew) {
//         if (err) {
//           res.status(400).json({
//             status: 'error',
//             error: err
//           });
//         }
//         user.profils = [profil._id];
//         user.save(function (err) {
//           if (err) {
//             res.status(400).json({
//               status: 'error',
//               error: err
//             });
//           }
//         });
//         res.json({
//           message: 'New profil created!',
//           data: profilNew
//         });
//       });
//     }
//   });
// };

// Handle view profil info
exports.view = function (req, res) {
  Profil.findById(req.params.profil_id, function (err, profil) {
    if (err) {
      res.status(400).json({
        status: 'error',
        error: err
      });
    }
    res.json({
      message: 'Profil details loading..',
      data: profil
    });
  });
};

// Handle update profil info
exports.update = function (req, res) {
  Profil.findByIdAndUpdate(req.params.profil_id, req.body, { new: true }, function (
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
      message: 'Profil Info updated',
      data: profil
    });
  });
};

// Handle delete profil
exports.delete = function (req, res) {
  Profil.remove(
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
        message: 'Profil deleted'
      });
    }
  );
};

exports.validate = function (req, res) {
  if (req.query && req.query.validationKey) {
    const key = req.query.validationKey;
    Profil.findOne({ token: key }, (err, profil) => {
      if (err) {
        res.status(400).json({
          status: 'ne peut pas être validé',
          error: err
        });
      } else {
        profil.active = true;
        // create profil Profil
        // creation profil controller
        // add profil to profil
        profil.save(function (err) {
          if (err) res.json(err);
          res.status(202).send({
            status: 'success',
            message: 'Compte utilisateur activé'
          });
        });
      }
    });
  } else {
    res.status(403).send({
      status: 'error',
      message: 'activation non autorisé'
    });
  }
};
