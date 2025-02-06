const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: String },
  username: { type: String },
  email: { type: String },
  githubId: { type: String, unique: true },
});

UserSchema.statics.findOrCreateGithubUser = async (profile) => {
  const user = await this.findOne({ githubId: profile.id });
  if (user) {
    return user;
  }

  return this.create({
    username: profile.username,
    email: profile.email,
    githubId: profile.id,
  });
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;