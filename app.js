// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const { errorHandler } = require('./middleware/error');
// const { bookRouter } = require('./routes/index');
// const { authorRouter } = require('./routes/index');
// const { getDb } = require('./db/mongodb');
// const Book = require('./models/book.js');
// const Author = require('./models/author.js');
// const swaggerUI = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerSpecOptions = require('./generateSwagger');
// const passport = require('passport');
// const session = require('express-session');
// const cors = require('cors');


// const app = express();

// const port = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// // Connect to MongoDB
// getDb()
//   .then(() => console.log('Connected to MongoDB successfully'))
//   .catch((err) => console.error(err));

// // Import controllers
// const bookController = require('./controllers/bookController');
// const authorController = require('./controllers/authorController');

// // Register routes
// app.use('/books', bookRouter);
// app.use('/authors', authorRouter);

// // Error handler
// app.use(errorHandler);
// const swaggerSpec = swaggerJsdoc(swaggerSpecOptions);

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// // Start server
// app.listen(port, () => console.log(`Listening on port ${port}...`));


require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { bookRouter } = require('./routes/index');
const { authorRouter } = require('./routes/index');
const session = require('express-session');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpecOptions = require('./generateSwagger');
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const { errorHandler } = require('./middleware/error');
const { getDb } = require('./db/mongodb');
const UserModel = require('./models/UserModel');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Connect to MongoDB
getDb()
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error(err));

// Passport and session middleware

// Generate a random secret using the crypto module
const sessionSecret = crypto.randomBytes(48).toString('hex');
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport-GitHub Strategy
passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create user in the database
    const user = await UserModel.findOrCreateGithubUser(profile);

    // Successful authentication, redirect to Swagger API docs
    done(null, user, { redirectTo: '/api/docs' });
  } catch (err) {
    done(err, null);
  }
}));

// Register routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

// Add route handler for the root path ("/")
app.get('/', (req, res) => {
  res.send('Welcome to your application');
});

// Error handler
app.use(errorHandler);
const swaggerSpec = swaggerJsdoc(swaggerSpecOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});