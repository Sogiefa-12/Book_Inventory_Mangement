const _ = require('lodash');

module.exports = function catchErrors(err, req, res, next) {
  // Set error status code
  const statusCode = _.get(err, 'status') || 500;

  // Send error response in a consistent format
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message,
      status: statusCode,
    },
  });
};