const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = function(req, res, next) {
    // Retrieve the token from the cookies
    const token = req.cookies.jwt;

    if (!token) {
        logger.warn('Authorization denied: No token provided.');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        logger.error(`Authorization error: ${error.message}`);
        res.status(401).json({ message: 'Token is not valid' });
    }
};
