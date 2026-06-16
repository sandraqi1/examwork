const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

bookSchema.virtual('id').get(function () {
  return this.bookId;
});

bookSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.bookId;
    return ret;
  }
});

bookSchema.pre('validate', async function (next) {
  if (this.isNew && this.bookId == null) {
    const Book = this.constructor;
    const lastBook = await Book.findOne({}, {}, { sort: { bookId: -1 } });
    this.bookId = lastBook ? lastBook.bookId + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('Book', bookSchema);
