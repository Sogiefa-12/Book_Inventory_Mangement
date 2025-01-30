const swaggerJsdoc = require('swagger-jsdoc');

const swaggerSpecOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Inventory Management API',
      version: '1.0.0',
      description: 'An API for managing a book inventory.',
    },
    components: {
      schemas: {
        Book: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            author: { type: 'string' },
            publisher: { type: 'string' },
            publicationYear: { type: 'number' },
            genre: { type: 'string' },
            isbn: { type: 'string' },
            description: { type: 'string' },
          },
        },
        Author: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            bio: { type: 'string' },
            books: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          },
        },
      },
    },
  },
  apis:['./routes/index.js']
};

module.exports = swaggerSpecOptions;