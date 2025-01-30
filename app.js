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

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Connect to MongoDB
getDb()
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error(err));

// Import controllers
const bookController = require('./controllers/bookController');
const authorController = require('./controllers/authorController');

// Register routes
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

// Error handler
app.use(errorHandler);
const swaggerSpec = swaggerJsdoc(swaggerSpecOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Start server
app.listen(port, () => console.log(`Listening on port ${port}...`));