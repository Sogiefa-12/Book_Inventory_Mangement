// const passport = require('passport');
// const GithubStrategy = require('passport-github').Strategy;
// const UserModel = require('../models/UserModel');

// // Function to handle the GitHub OAuth callback
// const oauthCallback = async (accessToken, refreshToken, profile, done) => {
//   try {
//     // Find or create user in the database
//     const user = await UserModel.findOrCreateGithubUser(profile);

//     // Successful authentication, redirect to Swagger API docs
//     done(null, user, { redirectTo: '/api/docs' });
//   } catch (err) {
//     done(err, null);
//   }
// };

// module.exports = {
//   oauthCallback,
// };


// const UserModel = require('../models/UserModel');
// const logger = require('../middleware/logger');

// // Function to handle the GitHub OAuth callback
// const oauthCallback = async (req, res) => {
//   try {
//     logger.debug('[oauthCallback] Entered oauthCallback'); // Use logger.debug

//     // Retrieve the user from the request object
//     const user = req.user;

//     logger.debug('[oauthCallback] User found or created'); // Use logger.debug

//     // Successful authentication, redirect to Swagger API docs
//     res.redirect('/api-docs');
//   } catch (err) {
//     logger.error('[oauthCallback] Error in oauthCallback:', err.message); // Use logger.error
//     // Handle the error or redirect with an error message
//   }
// };

// module.exports = {
//   oauthCallback,
// };