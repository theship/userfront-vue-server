require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Get the auth header value
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_STRING

    if (token == null) return res.sendStatus(401); // No token, unauthorized

    jwt.verify(token, process.env.USERFRONT_PUBLIC_KEY, { algorithms: ["RS256"] }, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token

        req.auth = user; // Assign the decoded user to request object
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = authenticateToken;
