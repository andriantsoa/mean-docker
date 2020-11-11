const EXPRESS_PORT = 3000;
const SECRET = 'Thisismysecret';
const MONGO_DB_USERNAME = '';
const MONGO_DB_PASSWORD = '';
const MONGO_DB_HOST = '127.0.0.1';
const MONGO_DB_PORT = 27017;
const MONGO_DB_PARAMETERS = '';
const MONGO_DB_DATABASE = 'asako-db';

module.exports = {
  mongodb: {
    uri:
      'mongodb://127.0.0.1:27017/asako-db'
    //  +
    // MONGO_DB_USERNAME +
    // ':' +
    // MONGO_DB_PASSWORD +
    // '@' +
    // MONGO_DB_HOST +
    // (MONGO_DB_PORT
    //   ? ':' + MONGO_DB_PORT + '/'
    //   : '/') +
    // MONGO_DB_DATABASE +
    // MONGO_DB_PARAMETERS,
  },
  secret: SECRET,
};
