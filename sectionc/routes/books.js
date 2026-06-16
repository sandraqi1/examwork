const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

function parseBookId(id) {
  const bookId = Number(id);
  return Number.isInteger(bookId) && bookId > 0 ? bookId : null;
}

router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const bookId = parseBookId(req.params.id);
  if (!bookId) {
    return res.status(400).json({ error: 'Invalid book id' });
  }

  try {
    const book = await Book.findOne({ bookId });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const bookId = parseBookId(req.params.id);
  if (!bookId) {
    return res.status(400).json({ error: 'Invalid book id' });
  }

  try {
    const book = await Book.findOneAndUpdate({ bookId }, req.body, {
      new: true,
      runValidators: true,
      context: 'query'
    });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  const bookId = parseBookId(req.params.id);
  if (!bookId) {
    return res.status(400).json({ error: 'Invalid book id' });
  }

  try {
    const book = await Book.findOneAndUpdate({ bookId }, req.body, {
      new: true,
      runValidators: true,
      context: 'query'
    });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const bookId = parseBookId(req.params.id);
  if (!bookId) {
    return res.status(400).json({ error: 'Invalid book id' });
  }

  try {
    const book = await Book.findOneAndDelete({ bookId });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
