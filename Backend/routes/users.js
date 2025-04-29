const express = require('express');
const router = express.Router();
const User = require('../models/user');
const db = require('../config/database');

router.post('/register', async (req, res) => {
    try {
        const { username, password, isAdmin } = req.body;
        console.log('Registration request:', { username, isAdmin }); // Debug log
        
        const userId = await User.register(username, password, Boolean(isAdmin));
        res.status(201).json({ id: userId });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if user exists and is not an admin
        const [users] = await db.query(
            'SELECT * FROM users WHERE username = ? AND is_admin = FALSE',
            [username]
        );
        
        const user = users[0];
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const result = await User.login(username, password);
        if (result.user.isAdmin) {
            return res.status(403).json({ message: 'Please use admin login' });
        }

        res.json(result);
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

router.post('/admin/register', async (req, res) => {
    try {
        const { username, password, adminKey } = req.body;
        
        // Verify admin registration key
        if (adminKey !== process.env.ADMIN_REGISTRATION_KEY) {
            return res.status(403).json({ message: 'Invalid admin registration key' });
        }

        const userId = await User.register(username, password, true);
        res.status(201).json({ id: userId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const [users] = await db.query(
            'SELECT * FROM users WHERE username = ? AND is_admin = TRUE',
            [username]
        );
        
        const user = users[0];
        if (!user) {
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }

        const result = await User.login(username, password);
        if (!result.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized as admin' });
        }

        res.json(result);
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(401).json({ message: 'Invalid admin credentials' });
    }
});

module.exports = router;
