const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            isAdmin: decoded.isAdmin // Make sure we're using the correct property
        };
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ message: 'Please authenticate' });
    }
};

module.exports = auth;
