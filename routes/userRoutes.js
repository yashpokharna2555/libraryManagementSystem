const express = require('express');
const db = require('../config/db');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

// User routes
router.get('/register', (req, res) => {
    res.render('user/register');
});
router.post('/register', userController.register);

router.get('/userLogin', (req, res) => {
    res.render('user/login');
});
router.post('/userLogin', userController.login);

router.get('/index', authenticateToken, userController.getBooksByPopular);

router.get('/books', authenticateToken, userController.getBookDetails);
router.get('/books/:bookId', authenticateToken, userController.getBookDetailsById);
router.post('/cart', authenticateToken, userController.addToCart);

// Cart routes
router.get('/cart', authenticateToken, userController.getCart);
router.post('/cart/update/:bookId', authenticateToken, userController.updateCartQuantity);
router.post('/cart/remove/:bookId', authenticateToken, userController.removeFromCart);

router.get('/checkout', authenticateToken, userController.checkout);
// router.post('/pay', authenticateToken, userController.payForm);
router.get('/filterBooks', authenticateToken, userController.getFilteredBooks);
router.post('/pay', authenticateToken, (req, res) => {
    console.log("req", req);
    const { userName, userEmail, userPhone, userAddress, userCity, userPostalCode, cardNumber, cardExpiry, cardCvv, otp } = req.body;
    const cart = req.session.cart || [];

    console.log('Request body:', req.body);
    console.log('Cart:', cart);
    console.log(cardNumber);
    console.log(cardExpiry);
    const cardNumberRegex = /^\d{16}$/;
    const cardExpiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const cardCvvRegex = /^\d{3,4}$/;

    if (!cardNumberRegex.test(cardNumber) || !cardExpiryRegex.test(cardExpiry) || !cardCvvRegex.test(cardCvv)) {
        return res.status(400).json({ message: 'Invalid card details' });
    }

    if (otps[userPhone] !== parseInt(otp)) {
        return res.json({ success: false, message: 'Invalid OTP' });
    }

    const orderQuery = 'INSERT INTO orders (user_id, order_details, order_quantity, order_price, order_email, order_phone) VALUES (?, ?, ?, ?, ?, ?)';
    const userId = req.user.id;
    const orderDetails = cart.map(item => `${item.bookDetails.book_name} (x${item.bookDetails.quantity})`).join(', ');
    const totalQuantity = cart.reduce((total, item) => total + item.bookDetails.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.bookDetails.book_price * item.bookDetails.quantity), 0);

    db.query(orderQuery, [userId, orderDetails, totalQuantity, totalPrice, userEmail, userPhone], (err, results) => {
        if (err) {
            console.error('Order Insertion Error:', err);
            return res.status(500).json({ message: 'Failed to process order' });
        }

        cart.forEach(item => {
            const updateQuery = 'UPDATE books SET book_quantity = book_quantity - ? WHERE book_id = ?';
            db.query(updateQuery, [item.bookDetails.quantity, item.bookDetails.book_id], (updateErr) => {
                if (updateErr) {
                    console.error('Book Quantity Update Error:', updateErr);
                }
            });
        });

        req.session.cart = [];

        setTimeout(() => {
            res.json({ success: true, message: 'Payment processed successfully' });
        }, 1000);
    });
});

// Mock database
const users = [];
const otps = {};

router.post('/send-otp', (req, res) => {
    
    const { phoneNumber } = req.body;
    console.log(phoneNumber);
    const otp = Math.floor(100000 + Math.random() * 900000);
    otps[phoneNumber] = otp;

    // For demo purposes, we'll just log the OTP
    console.log(`OTP for ${phoneNumber}: ${otp}`);
    res.json({ success: true });

    // In a real application, you would send the OTP via SMS or email
    // Here is an example of sending via email:
    /*
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'user-email@gmail.com',
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({ success: false });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ success: true });
        }
    });
    */
});

module.exports = router;
