

// const express = require('express');
// const passport = require('passport');
// const { UserModel } = require('../models/UserModel');
// const router = express.Router();

// // GitHub OAuth routes
// router.get('/login', passport.authenticate('github', { scope: ['profile', 'email'] }));

// router.get(
//   '/register',
//   passport.authenticate('github', { scope: ['profile', 'email'] }),
//   (req, res) => {
//     // Handle successful user registration
//     const { profile } = req.user;
//     res.status(200).json({ message: 'Registered successfully with GitHub OAuth' });
//   }
// );

// router.get('/register/redirect',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   async (req, res) => {
//     // Extract user information from GitHub
//     const { profile } = req.user;

//     // Find or create user in the database
//     const user = await UserModel.findOrCreateGithubUser(profile);

//     // Handle successful user registration
//     // You can redirect the user or send a response
//     res.status(200).json({ message: 'Successfully registered with GitHub OAuth' });
//   }
// );

// // Logout route
// router.post('/logout', (req, res) => {
//   req.session = null;
//   res.status(200).json({ message: 'Successfully logged out' });
// });

// module.exports = router;




const express = require('express');
const passport = require('passport');
const { oauthCallback } = require('../controllers/oauth2');
const router = express.Router();

// GitHub OAuth routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// Use oauthCallback from the oauth2.js file
router.get(
  'auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  oauthCallback
);
// Logout route
router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Successfully logged out' });
});

module.exports = router;