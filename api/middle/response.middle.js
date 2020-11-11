// handler http response
// gerer les reponses http
// 200, 400, 401, 403, 404, 500 a voir comment faire
exports.response = (res, status, message, data) => {
  res.json({
    status,
    message,
    data
  });
};
