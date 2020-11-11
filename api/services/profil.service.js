// 
const { async } = require("q");
const Profil = require("../models/profil.model");
const User = require("../models/user.model");

// Handle index actions

exports.createProfil = async function (user) {
  const profil = new Profil();
  profil.role = user.role;

  // save the profil and check for errors
  await profil.save((err, profilNew) => {
    if (err) {
      return {
        error: err
      };
    }
    user.active = true;
    user.profils = [profil._id];
    user.save(function (err) {
      if (err) {
        return {
          error: err
        };
      }
      return {
        profil
      };
    });
  });
};