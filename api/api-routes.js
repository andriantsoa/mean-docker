// Initialize express router
let router = require('express').Router();

const homeRoute = require('./routes/default.route');
const userRoute = require('./routes/user.route');
const profilRoute = require('./routes/profil.route');
const candidatRoute = require('./routes/candidat.route');
const entrepriseRoute = require('./routes/entreprise.route');
const offreRoute = require('./routes/offre.route');
router = homeRoute.addRoute(router);
router = userRoute.addRoute(router);
router = profilRoute.addRoute(router);
router = entrepriseRoute.addRoute(router);
router = offreRoute.addRoute(router);

router.use('/candidat', candidatRoute);

module.exports = router;
