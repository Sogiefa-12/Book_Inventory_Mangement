const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  publisher: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  genre: { type: String, required: true },
  isbn: { type: String, required: true },
  description: { type: String, required: true },
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;