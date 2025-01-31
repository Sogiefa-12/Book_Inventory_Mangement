const { getDb } = require('../db/mongodb');
const Book = require('../models/book.js');
const mongoose = require('mongoose');

const getAllBooks = async (req, res) => {
  try {
    const collection = await getDb('books'); 

    const result = await collection.find({}).toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching books.' });
  }
};


const getSingleBook = async (req, res) => {
  try {
    const collection = await getDb('books');

    const bookId = new mongoose.Types.ObjectId(req.params.id);

    const result = await collection.findOne({ _id: bookId });

    if (!result) {
      res.status(404).json({ message: 'Book not found.' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching book.' });
  }
};

const createBook = async (req, res) => {
  try {

    const collection = await getDb('books');

    const book = {
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      publicationYear: req.body.publicationYear,
      genre: req.body.genre,
      isbn: req.body.isbn,
      description: req.body.description,
    };
 
    const response = await collection.insertOne(book);

    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res.status(500).json({ message: 'Error creating book.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating book.' });
  }
};


const updateBook = async (req, res) => {
  try {
    const db = await getDb();
    const collection = await getDb('books');
    const bookId = new mongoose.Types.ObjectId(req.params.id);

    // Extract the fields from the request body to create the update document
    const updateData = Object.assign({}, req.body);

    const response = await collection.findOneAndUpdate(
      { _id: bookId },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (response === null) {
      res.status(404).json({ message: 'Book not found.' });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.error('updateBook error: ', err.message);
    console.error(err);
    res.status(500).json({ message: 'Error updating book.' });
  }
};

const { ObjectId } = require('mongoose').Types;
const deleteBook = async (req, res) => {
  try {
    const collection = await getDb('books');
    const bookId = new ObjectId(req.params.id);

    const response = await collection.deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: 'Book not found.' });
    }
  } catch (err) {
    console.error('deleteBook error: ', err.message);
    console.error(err);
    res.status(500).json({ message: 'Error deleting book.' });
  }
};


module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};