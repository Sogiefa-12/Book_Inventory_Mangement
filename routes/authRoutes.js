// const express = require('express');
// const { oAuthServer } = require('./oauth');
// const catchErrors = require('../middleware/catchErrors');
// const { UserModel } = require('../models/UserModel');
// const router = express.Router();

// /**
//  * @swagger
//  * /register:
//  *   post:
//  *     summary: Register a new user
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               username:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       '201':
//  *         description: Success
//  */
// router.post('/register', async (req, res, next) => {
//     try {
//         const { username, email, password } = req.body;
//         const hashedPassword = await UserModel.hashPassword(password);

//         const user = await UserModel.query().insert({
//             username,
//             email,
//             password: hashedPassword,
//         });

//         return res.status(201).json({ message: 'Registered successfully' });

//     } catch (err) {
//         return next(err);
//     }

// });

// /**
//  * @swagger
//  * /login:
//  *   post:
//  *     summary: Login a user
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               username:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       '200':
//  *         description: Success
//  */
// router.post('/login', oAuthServer.authenticate('password'), async (req, res) => {
//     try {
//       const { username, email } = req.body;
//       const user = await UserModel.query().findOne({
//         username,
//       });
  
//       if (!user) {
//         throw new Error('Invalid username or password');
//       }
  
//       const token = await UserModel.createToken(user);
//       return res.status(200).json({ token });
//     } catch (err) {
//       return next(err);
//     }
//   });
// /**
//  * @swagger
//  * /logout:
//  *   post:
//  *     summary: Logout a user
//  *   responses:
//  *     '200':
//  *       description: Success
//  */
// router.post('/logout', oAuthServer.logout(), (req, res) => {
//   res.status(200).json({ message: 'Successfully logged out' });
// });

// router.use(catchErrors);

// module.exports = router;


const express = require('express');
const passport = require('passport');
const { UserModel } = require('../models/UserModel');
const router = express.Router();

// GitHub OAuth routes
router.get('/login', passport.authenticate('github', { scope: ['profile', 'email'] }));

router.get(
  '/register',
  passport.authenticate('github', { scope: ['profile', 'email'] }),
  (req, res) => {
    // Handle successful user registration
    const { profile } = req.user;
    res.status(200).json({ message: 'Registered successfully with GitHub OAuth' });
  }
);

router.get('/register/redirect',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    // Extract user information from GitHub
    const { profile } = req.user;

    // Find or create user in the database
    const user = await UserModel.findOrCreateGithubUser(profile);

    // Handle successful user registration
    // You can redirect the user or send a response
    res.status(200).json({ message: 'Successfully registered with GitHub OAuth' });
  }
);

// Logout route
router.post('/logout', (req, res) => {
  req.session = null;
  res.status(200).json({ message: 'Successfully logged out' });
});

module.exports = router;