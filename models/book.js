const db = require('../config/db');

const Book = {
    createBook: function(title, category, author, description, image, price, quantity, callback) {
        db.query('INSERT INTO books (book_name, book_category, book_author, book_desc, book_img, book_price, book_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [title, category, author, description, image, price, quantity], 
            function(err, results) {
                if (err) {
                    return callback(err);
                }
                callback(null, results.insertId);
            }
        );
    },

    viewUsers: function(callback) {
        db.query('SELECT * FROM users', function(err, results) {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    viewBooks: function(callback) {
        db.query('SELECT * FROM books', function(err, results) {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getBookDetails: function(bookId, callback) {
        db.query('SELECT * FROM books WHERE book_id = ?', [bookId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length === 0) {
                return callback('Book not found', null);
            }
            const book = results[0];
            console.log("edit book - ", book);
            callback(null, book);
        });
    },

    updateBook: function(bookId, title, category, author, description, image, price, quantity, callback) {
        let query = 'UPDATE books SET book_name = ?, book_category = ?, book_author = ?, book_desc = ?, book_price = ?, book_quantity = ?';
        const values = [title, category, author, description, price, quantity, bookId];

        // Only add the book_img to the query if an image is provided
        if (image) {
            query += ', book_img = ? WHERE book_id = ?';
            values.splice(-1, 0, image);
        } else {
            query += ' WHERE book_id = ?';
        }

        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    deleteBook: function(bookId, callback) {
        db.query('DELETE FROM books WHERE book_id = ?', [bookId], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    }
};

module.exports = Book;
