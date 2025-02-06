require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const  UserModel  = require('../models/UserModel');

const oAuthServer = express();

// Serialize and deserialize user instances
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.query().findById(id);
  done(null, user);
});

// Define OAuth strategies
// In this example, we use passport-github strategy
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  const user = await UserModel.query().findOne({
    githubId: profile.id,
  });

  if (!user) {
    return done(new Error('User not found'), null);
  }

  done(null, user);
}));

// Export the oAuthServer
module.exports = { oAuthServer };