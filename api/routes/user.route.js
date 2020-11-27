// Import user controller
const userController = require('../controllers/users.controller');
const logger = require('../services/private/logger.service');

exports.addRoute = (router) => {
  logger.info('Initialisation des user');

  router
    .route('/users')
    .get(userController.index)
    .post(userController.new);
  router
    .route('/user/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);
  router
    .route('/user/authenticate').post(userController.authenticate);
  router
    .route('/user/changepassword/:user_id')
    .put(userController.changePassword);
  router
    .route('/user/validation')
    .post(userController.validate);

  return router;
};