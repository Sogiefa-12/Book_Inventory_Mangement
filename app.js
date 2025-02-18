require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const UserModel = require('./models/UserModel');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Generate a random secret using the crypto module
const sessionSecret = crypto.randomBytes(48).toString('hex');
const sessionStore = MongoStore.create({
  mongoUrl: process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/your_db_name',
});

// Connect to MongoDB
const db = require('./db/mongodb');
db.getDb().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: sessionStore, // Use MongoStore for session storage
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use('/', require('./routes/index')); // Include routes

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
  console.log('GitHub profile:', profile);
  return done(null, profile);
}))

// Routes
app.get('/', (req, res) => {
  res.send(
      req.session.user !== undefined
          ? `Logged in as ${req.session.user.displayName}`
          : 'Logged Out'
  );
});

// GitHub OAuth routes
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    req.session.user = req.user; // Save user's ID in the session
    res.redirect('/api-docs');
  }
);

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});