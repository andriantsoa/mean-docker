const candidatController = require('../controllers/candidat.controller');
const logger = require('../services/private/logger.service');

exports.addRoute = (router) => {
  logger.info('Initialisation des candidat');

  router
    .route('/candidats')
    .get(candidatController.index)
  router
    .route('/candidat/:candidat_id')
    .get(candidatController.view)
    .patch(candidatController.update)
    .put(candidatController.update);

  return router;
};