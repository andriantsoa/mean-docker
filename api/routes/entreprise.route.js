const entrepriseController = require('../controllers/entreprise.controller');
const logger = require('../services/private/logger.service');

exports.addRoute = (router) => {
  logger.info('Initialisation des entreprise');

  router
    .route('/entreprises')
    .get(entrepriseController.index)
  router
    .route('/entreprise/:entreprise_id')
    .get(entrepriseController.view)
    .patch(entrepriseController.update)
    .put(entrepriseController.update);
  router
    .route('/entreprise/:entreprise_id/offre')
    .post(entrepriseController.offer);
  return router;
};