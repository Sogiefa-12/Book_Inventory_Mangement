const passport = require('passport');
const UserModel = require('./models/UserModel');
const { getDb } = require('./db/mongodb');
const GitHubStrategy = require('passport-github').Strategy;


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user in the database
      const user = await UserModel.findOrCreateGithubUser(profile);
  
      // Successful authentication, redirect to Swagger API docs
      done(null, user, { redirectTo: '/api-docs/' });
    } catch (err) {
      done(err, null);
    }
  }));


// Define a custom serialization function
passport.serializeUser((user, done) => {
  // Only store the user's ID in the session
  done(null, user._id);
});

// Define a custom deserialization function
passport.deserializeUser(async (id, done) => {
  try {
    // Retrieve the user from the database using the provided ID
    const user = await UserModel.findById(id);

    // Pass the user back to Passport
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});