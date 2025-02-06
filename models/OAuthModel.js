const mongoose = require('mongoose');

const OAuthSchema = new mongoose.Schema({
  id: { type: String },
  client_id: { type: String },
  client_secret: { type: String },
  redirect_uri: { type: String },
  grant_types: { type: Array },
});

const OAuthModel = mongoose.model('OAuth', OAuthSchema);

module.exports = OAuthModel;