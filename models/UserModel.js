const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: { type: String },
  username: { type: String },
  email: { type: String },
  githubId: { type: String, unique: true },
});

UserSchema.statics.findOrCreateGithubUser = async (profile) => {
  const UserModel = require('./models/UserModel'); // Import UserModel

  const user = await UserModel.findOne({ githubId: profile.id });
  if (user) {
    return user;
  }

  return UserModel.create({
    username: profile.username,
    email: profile.email,
    githubId: profile.id,
  });
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;