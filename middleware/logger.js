const moment = require('moment');

module.exports = {
  debug: (message) => {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(`[${timestamp}] Debug: ${message}`);
  },
  error: (message) => {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    console.error(`[${timestamp}] Error: ${message}`);
  }
};