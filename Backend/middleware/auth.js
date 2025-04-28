const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            throw new Error('No Authorization header');
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        req.user = {
            id: decoded.id,
            isAdmin: Boolean(decoded.is_admin) // Ensure boolean conversion
        };
        console.log('User object:', req.user);
        next();
    } catch (error) {
        console.error('Auth error:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        res.status(401).json({ 
            message: 'Authentication failed',
            error: error.message 
        });
    }
};

module.exports = auth;
