const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
    const validationRule = {
      title: 'required|string',
      author: 'required|string',
      publisher: 'required|string',
      publicationYear: 'required|isNumeric',
      genre: 'string',
      isbn: 'string',
      description: 'string',
    }


  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveAuthor = (req, res, next) => {
    const validationRule = {
    firstName  :  'required|string',
    lastName    : 'required|string',
    biog: 'string',
    books: 'array'
    };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
}





module.exports = {
  saveBook,
  saveAuthor,
};
