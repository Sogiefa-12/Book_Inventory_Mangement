const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const UserModel = require('../models/UserModel');

// Function to handle the GitHub OAuth callback
const oauthCallback = async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user in the database
      const user = await UserModel.findOrCreateGithubUser(profile);
  
      // Successful authentication, redirect to Swagger API docs
      done(null, user, { redirectTo: '/api/docs' });
    } catch (err) {
      done(err, null);
    }
  };
  
  module.exports = {
    oauthCallback,
  };