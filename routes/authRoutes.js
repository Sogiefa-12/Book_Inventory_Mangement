// const express = require('express');
// const passport = require('passport');
// // Import the oauthCallback function
// const { oauthCallback } = require('../controllers/oauth2');
// const router = express.Router();

// // GitHub OAuth routes
// router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// // Use oauthCallback as a separate route handler
// router.get(
//   '/github/callback',
//   passport.authenticate('github', {
//     failureRedirect: '/login', // Update the failureRedirect URL
//   }),
//   oauthCallback // Use oauthCallback as the route handler function
// );

// // Logout route
// router.post('/logout', (req, res) => {
//   req.logout();
//   res.status(200).json({ message: 'Successfully logged out' });
// });

// module.exports = router;