// Import Profil controller
const profilController = require('../controllers/profils.controller');

exports.addRoute = (router) => {
  router
    .route('/profils')
    .get(profilController.index)
  router
    .route('/profil/:profil_id')
    .get(profilController.view)
    .patch(profilController.update)
    .put(profilController.update);

  return router;
};