const offreController = require('../controllers/offre.controller');
const logger = require('../services/private/logger.service');

exports.addRoute = (router) => {
  logger.info('Initialisation des offres');

  router
    .route('/offres')
    .get(offreController.index)
  router
    .route('/offres/public')
    .get(offreController.publicJobOffers)
  router
    .route('/offre/:offre_id')
    .get(offreController.view)
  router
    .route('/entreprise/:entreprise_id/offres')
    .get(offreController.index)
  router
    .route('/entreprise/:entreprise_id/offre/:offre_id')
    .get(offreController.viewFull)
    .put(offreController.update)
    .patch(offreController.update);
  return router;
};