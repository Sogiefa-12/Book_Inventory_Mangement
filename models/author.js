const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;