const { Model } = require('objection');

class UserModel extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
        githubId: { type: 'string' },
      },
    };
  }

  static async findOrCreateGithubUser(profile) {
    const user = await UserModel.query().findOne({ githubId: profile.id });

    if (user) {
      return user;
    }

    return UserModel.query().insert({
      username: profile.username,
      email: profile.email,
      githubId: profile.id,
    });
  }
}

module.exports = UserModel;