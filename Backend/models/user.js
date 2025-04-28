const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User {
    static async register(username, password) {
        const hashedPassword = await bcrypt.hash(password, 8);
        const [result] = await db.query(
            'INSERT INTO users (username, password_hash) VALUES (?, ?)',
            [username, hashedPassword]
        );
        return result.insertId;
    }

    static async login(username, password) {
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = users[0];
        
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { 
                id: user.id,
                isAdmin: Boolean(user.is_admin)
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        return {
            user: {
                id: user.id,
                username: user.username,
                isAdmin: Boolean(user.is_admin)
            },
            token
        };
    }
}

module.exports = User;
