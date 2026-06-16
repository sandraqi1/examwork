# Bookstore API

Express.js REST API for Mugisha's bookstore in Kigali, connected to MongoDB with Mongoose.

## Setup

```bash
npm install
```

Start server:
```bash
npm start
```

Server runs on `http://localhost:3000`

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/books` | Create a new book |
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get one book by numeric ID |
| PUT | `/api/books/:id` | Update a book by numeric ID |
| DELETE | `/api/books/:id` | Delete a book by numeric ID |

## Book Fields

- `title` (String, required)
- `author` (String, required)
- `price` (Number, required)

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
