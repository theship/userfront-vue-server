require('dotenv').config();
const jwt = require('jsonwebtoken');

const publicKey = process.env.USERFRONT_PUBLIC_KEY

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>

    if (token == null) return res.sendStatus(401); // No token, unauthorized

    jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {

        if (err) {
            console.log('JWT Error:', err.message);
            return res.status(403).json({ error: "Invalid token", details: err.message });
        }
    
        console.log(decoded);

        // Attach user information to the request
        const tenantId = decoded.tenantId;
        const roles = decoded.authorization && decoded.authorization[tenantId] ? decoded.authorization[tenantId].roles : [];

        // Attach user information to the request
        req.user = {
            userId: decoded.userId,
            userUuid: decoded.userUuid,
            tenantId: tenantId,
            roles: roles
        };

        console.log(req.user);
        
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = authenticateToken;
