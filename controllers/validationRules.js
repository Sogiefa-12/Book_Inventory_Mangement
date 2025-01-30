
const bookValidationSchema = {
    title: {
      isLength: {
        options: { min: 2 },
        errorMessage: 'Title must be at least 2 characters long',
      },
      isString: {
        errorMessage: 'Title must be a string',
      },
    },
    author: {
      isString: {
        errorMessage: 'Author must be a string',
      },
    },
    publisher: { 
        isString: {
          errorMessage: 'Publisher must be a string',
        },
      },
    publicationYear: { 
        isNumber: {
            options: { min:1000},
          errorMessage: 'Publication year must be a number',
        },
      },
    genre: { 
        isString: {
          errorMessage: 'Genre must be a string',
        },
      },
    isbn: { 
        isString: {
          errorMessage: 'ISBN must be a string',
        },
      },
    description: { 
        isString: {
          errorMessage: 'Description must be a string',
        },
      },
  };

  
  const authorValidationSchema = {
    firstName: {
      isString: {
        errorMessage: 'First name must be a string',
      },
    },
    lastName: {
      isString: {
        errorMessage: 'Last name must be a string',
      },
    },
    bio: {
      isString: {
        errorMessage: 'Bio must be a string',
      },
    },
    books: { 
        type: 'array',
        items: {
          type: 'string'
        }
      }
  
  };


  
  module.exports = {
    bookValidationSchema,
    authorValidationSchema,
  };