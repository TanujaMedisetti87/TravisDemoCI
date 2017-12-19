var BookApi = require('../data/BookApi');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  BookApi.getAllBooks(function(err, items) {
    res.render('book/index', {title: 'Books', books: items})
	});
});

router.get('/create', function(req, res) {
	res.render('book/create');
});

router.post('/create', function(req, res) {
  var book = {};
  book.id = req.body.id;
  book.title = req.body.title;
  book.author = req.body.author;
  book.publisher = req.body.publisher;
  book.publishedDate = req.body.publishedDate;
  book.price = req.body.price;
  book.genre = req.body.genre;
  book.format = req.body.format;
  BookApi.saveBook(book, function(err, book) {
	  res.redirect('/book');
  });
});

router.get('/edit/:id', function(req, res) {
  BookApi.getBookById(req.params.id, function(err, book) {
    res.render('book/edit', {book: book});
  });

});

router.post('/edit/:id', function(req, res) {
  var updatedBook = {};
  updatedBook.id = req.body.id;
  updatedBook.title = req.body.title;
  updatedBook.author = req.body.author;
  updatedBook.publisher = req.body.publisher;
  updatedBook.publishedDate = req.body.publishedDate;
  updatedBook.price = req.body.price;
  updatedBook.genre = req.body.genre;
  updatedBook.format = req.body.format;
  BookApi.updateBookById(req.params.id, updatedBook, function(err) {
			res.redirect('/book');
  });
});

router.get('/delete/:id', function(req, res) {
  BookApi.deleteBookById(req.params.id, function(err) {
    res.redirect('/book');
  });
});

module.exports = router;
