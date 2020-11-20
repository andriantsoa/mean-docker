// Import Contact controller
const contactController = require('../controllers/contact.controller');

exports.addRoute = (router) => {
  router
    .route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
  router
    .route('/contact/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

  return router;
};