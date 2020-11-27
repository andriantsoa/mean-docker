// Import Profil controller
const profilController = require('../controllers/profils.controller');
const logger = require('../services/private/logger.service');

exports.addRoute = (router) => {
  logger.info('Initialisation des profil');

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