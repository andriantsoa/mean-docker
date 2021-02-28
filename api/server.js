require('dotenv').config();
let express = require('express');
let app = express();
const environment = require('./config/environment');
let cors = require('cors');
let path = require('path');
let bodyParser = require('body-parser');
let expressJwt = require('express-jwt');
// Import Mongoose
let mongoose = require('mongoose');
const logger = require('./services/private/logger.service');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(express.static(path.resolve(__dirname, 'public')));

// Connect to Mongoose and set connection variable
// MongoDB connection
mongoose.connect(environment.mongodb.uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

// On connection error
mongoose.connection.on('error', (error) => {
  logger.error('Database error: ', error);
});

// On successful connection
mongoose.connection.on('connected', () => {
  logger.info('Connecté sur la base de données ' + environment.mongodb.uri);
});

// addtional configuration when serving Angular SPA (static reource and Anugalr routing)
const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
  '.webmanifest'
];
// app.get('*', (req, res) => {
//   if (allowedExt.filter((ext) => req.url.indexOf(ext) > 0).length > 0) {
//     res.sendFile(path.resolve(`public/${req.url}`));
//   } else {
//     res.sendFile(path.resolve('public/index.html'));
//   }
//
// });

// Import routes
let apiRoutes = require('./api-routes');

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(
  expressJwt({
    secret: environment.secret,
    algorithms: ['HS256'],
    getToken: function (req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    }
  }).unless({ path: ['/api/user/authenticate', '/api/users', '/index.html'] })
);

// Use Api routes in the App
app.use('/api', apiRoutes);

// config mail
// const mailConfig = require('./config/mail.config');
// const transporter = mailConfig.transporter;

// app.configure(function() {
//   app.set('transporter', transporter);
// });

const HOST = '127.0.0.1';
// start server
// Launch app to listen to specified port
const server = app.listen(process.env.EXPRESS_PORT_ARTI, HOST, () => {
  const PORT = server.address().port;
  logger.info(`Serveur lancé sur http://${HOST}:${PORT}`);
});
