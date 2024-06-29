const db = require('../config/db');

const User = {
  createUser: function(name, email, password, city, phone, gender, callback) {
    db.query('SELECT * FROM users WHERE email = ?', [email], (error, existingResults) => {
      if (error) {
        return callback(error);
      }
      if (existingResults.length > 0) {
        const errorMessage = "Email is already registered";
        return callback(errorMessage);
      }
      db.query('INSERT INTO users (name, email, password, city, phone, gender) VALUES (?, ?, ?, ?, ?, ?)', [name, email, password, city, phone, gender], function(err, results) {
        if (err) {
          return callback(err);
        }
        callback(null, results.insertId);
      });
    });
  },

  findByEmail: function(email) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
          return reject(error);
        }
        if (results.length === 0) {
          return resolve(null);
        }
        const user = results[0];
        resolve({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          city: user.city,
          phone: user.phone,
          gender: user.gender
        });
      });
    });
  },

  viewBooks: function(callback) {
    db.query('SELECT * FROM books', (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  },

  viewPopularBooks: function(callback) {
    db.query('SELECT * FROM books ORDER BY book_purchase DESC LIMIT 6', (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  },

  getBookDetailsById: function(bookId, callback) {
    db.query('SELECT * FROM books WHERE book_id = ?', [bookId], (err, results) => {
      if (err) {
        return callback(err);
      }
      if (results.length === 0) {
        return callback(new Error('Book not found'));
      }
      const bookDetails = results[0];
      const category = bookDetails.book_category;
      db.query('SELECT * FROM books WHERE book_category = ? AND book_id != ?', [category, bookId], (err, categoryResults) => {
        if (err) {
          return callback(err);
        }
        const response = {
          bookDetails: bookDetails,
          booksInSameCategory: categoryResults
        };
        return callback(null, response);
      });
    });
  },

  getFilteredBooks: function(priceRange, category, author, callback) {
    let query = 'SELECT * FROM books WHERE 1=1';
    const queryParams = [];
    
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      query += ' AND book_price BETWEEN ? AND ?';
      queryParams.push(minPrice, maxPrice);
    }

    if (category) {
      const categories = category.split(',');
      query += ' AND book_category IN (?)';
      queryParams.push(categories);
    }

    if (author) {
      query += ' AND book_author LIKE ?';
      queryParams.push(`%${author}%`);
    }

    db.query(query, queryParams, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  },
  getAllUsers: function(callback) {
    db.query('SELECT * FROM users', function(err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
},

getUserById: function(userId, callback) {
    db.query('SELECT * FROM users WHERE id = ?', [userId], function(err, results) {
        if (err) {
            return callback(err);
        }
        if (results.length === 0) {
            return callback('User not found', null);
        }
        callback(null, results[0]);
    });
},

getUserOrders: function(userId, callback) {
    db.query('SELECT * FROM orders WHERE user_id = ?', [userId], function(err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}
};

module.exports = User;
