const bcrypt = require('bcrypt');
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
        password: { type: 'string' },
        email: { type: 'string' },
      },
    };
  }

  static async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async register(username, email, password) {
    const hashedPassword = await UserModel.hashPassword(password);

    const user = await UserModel.query().insert({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }

  async authenticate(username, password) {
    const user = await UserModel.query().findOne({
      username,
    });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isMatch = await UserModel.comparePassword(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    return user;
  }

  async createToken(user) {
    const token = await oAuthServer.token({ id: user.id });
    return token;
  }
}

module.exports = UserModel;