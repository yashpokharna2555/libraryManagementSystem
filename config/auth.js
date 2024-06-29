// Manages authentication-related configuration, such as secret keys for generating and verifying JWT tokens.
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');

module.exports = {
    secretKey: secretKey,
    expiresIn: '24h'
};