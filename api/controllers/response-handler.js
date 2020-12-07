const logger = require('../services/private/logger.service');

const getResponseParam = (code) => {
  switch (code) {
    case 500:
      return {
        status: 'error',
        error: 'Server Error',
        message: 'Erreur au niveau du service'
      };
    case 400:
      return {
        status: 'error',
        error: 'Bad Request.'
      };
    case 401:
      return {
        status: 'error',
        error: 'Bad Credentials',
        message: 'Authentification invalide'
      };
    case 403:
      return {
        status: 'error',
        error: 'non authorized',
        message: 'Non autorisé'
      };
    case 404:
      return {
        status: 'error',
        error: 'not found',
        message: 'données introuvables'
      };
    case 202:
      return {
        status: 'success',
      };
    case 200:
      return {
        status: 'OK',
      };
    default:
      return {
        status: 'unknown'
      };
  }
}

exports.handleWithParam = (res, param) => {
  const code = param.code;
  const status = param.status;
  const message = param.message;
  const data = param.data;
  const error = param.error;
  if (error) logger.error(status + ' erreur: ' + error + ' ' + message);
  logger.info(`${code} (${status}): ${message}`);
  return res.status(code).json({
    status,
    message,
    data,
    error,
  });
};

exports.handleError = (res, errors = 'Server Error', code = 500, messages = null) => {
  const param = getResponseParam(code);
  const status = param.status;
  const message = messages ? messages : param.message ? param.message : null;
  const error = errors ? errors : param.error ? param.error : null;
  const response = {
    status,
    message,
    error,
  };
  logger.error(`Erreur ${code} (${status}): ${message}: ${error}`);
  return res.status(code).json(response);
};

exports.handleData = (res, data, metadata = {}) => {
  const code = 200;
  const param = getResponseParam(code);
  const status = param.status;
  const message = param.message ? param.message : null;
  const response = {
    status,
    message,
    data,
    metadata
  };
  logger.info(`${code} (${status}): ${message}`);
  return res.status(code).json(response);
};

exports.handleMessage = (res, messages = 'resultat obtenu') => {
  const code = 202;
  const param = getResponseParam(code);
  const status = param.status;
  const message = messages ? messages : param.message ? param.message : null;
  const response = {
    status,
    message,
  };
  logger.info(`${code} (${status}): ${message}`);
  return res.status(code).json(response);
};

exports.handleDataAndMessage = (res, data, messages = 'resultat obtenu') => {
  const code = 200;
  const param = getResponseParam(code);
  const status = param.status;
  const message = messages ? messages : param.message ? param.message : null;
  const response = {
    status,
    message,
    data,
  };
  logger.info(`${code} (${status}): ${message}`);
  return res.status(code).json(response);
};