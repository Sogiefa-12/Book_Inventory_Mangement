const { format } = require('util');

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const error = {
    message: err.message || 'Internal server error',
    stack: format(err.stack),
    status: statusCode,
  };

  res.status(statusCode).json({ error });
};

module.exports = {
  errorHandler,
};