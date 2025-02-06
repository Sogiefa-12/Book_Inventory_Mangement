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
const { errorHandler } = require('./middleware/error');
const { bookRouter } = require('./routes/index');
const { authorRouter } = require('./routes/index');
const { getDb } = require('./db/mongodb');
const Book = require('./models/book.js');
const Author = require('./models/author.js');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpecOptions = require('./generateSwagger');
const passport = require('passport');
const { Strategy } = require('passport-github');
const session = require('express-session');
const cors = require('cors');
const oAuthServer  = require('./routes/authRoutes');
const UserModel  = require('./models/UserModel');

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

// Import controllers
const bookController = require('./controllers/bookController');
const authorController = require('./controllers/authorController');

// Configure passport-github strategy
passport.use(new Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  const user = await UserModel.findOrCreateGithubUser(profile);
  done(null, user);
}));

// Register routes
app.use('/auth', oAuthServer);
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

// Passport and session middleware
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Error handler
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});