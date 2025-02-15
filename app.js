
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { bookRouter } = require('./routes/index');
// const { authorRouter } = require('./routes/index');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpecOptions = require('./generateSwagger');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { errorHandler } = require('./middleware/error');
const { getDb } = require('./db/mongodb');
const UserModel = require('./models/UserModel');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 5000;

// Middleware

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Connect to MongoDB
getDb()
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error(err));

// Passport and session middleware

// Generate a random secret using the crypto module
const sessionSecret = crypto.randomBytes(48).toString('hex');
const sessionStore = MongoStore.create({
  mongoUrl: process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/your_db_name',
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

app.use('/', require('./routes/index'))

// GitHub OAuth routes
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);


app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : ' Welcome to your application, Logged out'
  );
});

app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});


passport.deserializeUser((obj, done) => {
  done(null, obj);
});


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
  console.log('GitHub profile:', profile); // Add this line
  return done(null, profile);
}
));



// GitHub OAuth routes
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


// // Register routes

// app.use('/auth', authRoutes);
// app.use('/books', bookRouter);
// app.use('/authors', authorRouter);


// Error handler
app.use(errorHandler);
const swaggerSpec = swaggerJsdoc(swaggerSpecOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


