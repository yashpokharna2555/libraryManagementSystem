// Middleware for user authentication. It intercepts incoming requests and verifies the JWT token to authenticate users before allowing access to protected routes.

// middleware/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    console.log("Token - ", token);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
