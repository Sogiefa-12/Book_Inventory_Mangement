const mongoose = require('mongoose');

const getDb = async (collectionName) => {
  const client = await mongoose.connect(process.env.DATABASE_URI);
  const db = mongoose.connection.getClient().db();

  if (!db) {
    throw new Error('Failed to connect to MongoDB');
  }

  return db.collection(collectionName);
};

module.exports = {
  getDb,
};