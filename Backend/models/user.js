const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User {
    static async register(username, password, isAdmin = false) {
        const hashedPassword = await bcrypt.hash(password, 8);
        console.log('Registering user:', { username, isAdmin }); // Debug log
        
        const [result] = await db.query(
            'INSERT INTO users (username, password_hash, is_admin) VALUES (?, ?, ?)',
            [username, hashedPassword, isAdmin]
        );
        return result.insertId;
    }

    static async login(username, password) {
        try {
            console.log('Login attempt for:', username); // Debug log
            
            const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            const user = users[0];

            if (!user) {
                console.log('User not found:', username);
                throw new Error('Invalid credentials');
            }

            const isValid = await bcrypt.compare(password, user.password_hash);
            console.log('Password check:', { isValid, isAdmin: user.is_admin }); // Debug log

            if (!isValid) {
                throw new Error('Invalid credentials');
            }

            const token = jwt.sign(
                { id: user.id, isAdmin: Boolean(user.is_admin) },
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
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
}

module.exports = User;
