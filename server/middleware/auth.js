
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer TOKEN"

    // If no token is provided, proceed without setting req.user (for optional authentication)
    if (token == null) {
        req.user = null; // Explicitly set to null if no token
        return next();
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT verification error:', err.message);
            req.user = null;
            return next();
        }
        req.user = user.user; // Attach user payload to request (contains id, email, role)
        next(); // Proceed to the next middleware/route handler
    });
}

// Strictly protected middleware
function ensureAuthenticated(req, res, next) {
    authenticateToken(req, res, () => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required to access this resource.' });
        }
        next();
    });
}

// Admin only middleware
function verifyAdmin(req, res, next) {
    ensureAuthenticated(req, res, () => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }
        next();
    });
}

module.exports = { authenticateToken, ensureAuthenticated, verifyAdmin };
