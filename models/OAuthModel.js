const { Model } = require('objection');

// Define your OAuth 2.0 model
class OAuthModel extends Model {
  static get tableName() {
    return 'oauth_clients';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        client_id: { type: 'string' },
        client_secret: { type: 'string' },
        redirect_uri: { type: 'string' },
        grant_types: { type: 'array' },
      },
    };
  }
}

module.exports = OAuthModel;