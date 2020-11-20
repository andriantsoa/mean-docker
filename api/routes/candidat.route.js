const candidatController = require('../controllers/candidat.controller');

exports.addRoute = (router) => {
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