// Main entry point of the application. It sets up the Express server, initializes middleware, defines routes, and starts the server listening on a specified port.

const db = require('./config/db');
const express = require("express");
const path = require('path')
const fs = require('fs');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const injectUser = require('./middleware/injectUser');
const app = express();
const port = 5000;

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(injectUser);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your_secret_key_here', 
    resave: true,
    saveUninitialized: true
}));




// Define view engine and static files
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.render('home'); 
});

app.listen(port, () => {
    console.log("server up and running on PORT :", port);
});
  