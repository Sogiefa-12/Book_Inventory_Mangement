const { getDb } = require('../db/mongodb');
const Author = require('../models/author.js');
const Book = require('../models/book.js');
const mongoose = require('mongoose');

// const validate = require('validator').validate;

// const { bookValidationSchema, authorValidationSchema } = require('./validationRules');

const getAllAuthors = async (req, res) => {
  try {
    const collection = await getDb('authors');
    const result = await collection.find({}).toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching authors.' });
  }
};

const getSingleAuthor = async (req, res) => {
  try {
    const collection = await getDb('authors');
    const authorId = new mongoose.Types.ObjectId(req.params.id);

    const result = await collection.findOne({ _id: authorId });

    if (!result) {
      res.status(404).json({ message: 'Author not found.' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    }
  } catch (err) {
    console.error('getSingleAuthor error: ', err.message);
    console.error(err);
    res.status(500).json({ message: 'Error fetching author.' });
  }
};

const createAuthor = async (req, res) => {
  try {
    const collection = await getDb('authors');

    const author = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      books: req.body.books,
    };
    

    //  // Validate the author data
    //  const errors = validate(author).errors;
    //  if (errors.length > 0) {
    //    res.status(400).json({ errors: errors });
    //    return;
    //  }

    const response = await collection.insertOne(author);

    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res.status(500).json({ message: 'Error creating author.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating author.' });
  }
};


const updateAuthor = async (req, res) => {
  try {
    const collection = await getDb('authors');
    const authorId = new mongoose.Types.ObjectId(req.params.id);

    // Extract the fields from the request body to create the update document
    const updateData = Object.assign({}, req.body);

    // // Validate the updated author data
    //  // Validate the author data
    //  const errors = validate(updateData).errors;
    //  if (errors.length > 0) {
    //    res.status(400).json({ errors: errors });
    //    return;
    //  }
 

    const response = await collection.findOneAndUpdate(
      { _id: authorId },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Author not found.' });
    }
  } catch (err) {
    console.error('updateAuthor error: ', err.message);
    console.error(err);
    res.status(500).json({ message: 'Error updating author.' });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const collection = await getDb('authors');
    const authorId = new mongoose.Types.ObjectId(req.params.id);

    const response = await collection.deleteOne({ _id: authorId });

    if (response.deletedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: 'Author not found.' });
    }
  } catch (err) {
    console.error('deleteAuthor error: ', err.message);
    console.error(err);
    res.status(500).json({ message: 'Error deleting author.' });
  }
};

const getAuthorWithBooks = async (req, res) => {
  try {
    const db = await getDb();
    const authorId = new mongoose.Types.ObjectId(req.params.id);

    // Get the author
    const author = await Author.findById(authorId).populate('books');

    if (!author) {
      res.status(404).json({ message: 'Author not found.' });
    } else {
      res.status(200).json(author);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching author and books.' });
  }
};


module.exports = {
  getAllAuthors,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorWithBooks
};