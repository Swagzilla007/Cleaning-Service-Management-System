const db = require('../config/database');

class Booking {
    static async getAll(userId) {
        const [rows] = await db.query(
            'SELECT bookings.*, services.name as service_name FROM bookings LEFT JOIN services ON bookings.service_id = services.id WHERE user_id = ?',
            [userId]
        );
        return rows;
    }

    static async create(booking) {
        const [result] = await db.query(
            'INSERT INTO bookings (customer_name, address, date_time, service_id, user_id) VALUES (?, ?, ?, ?, ?)',
            [booking.customer_name, booking.address, booking.date_time, booking.service_id, booking.user_id]
        );
        return result.insertId;
    }

    static async update(id, booking) {
        const [result] = await db.query(
            'UPDATE bookings SET customer_name = ?, address = ?, date_time = ?, service_id = ? WHERE id = ? AND user_id = ?',
            [booking.customer_name, booking.address, booking.date_time, booking.service_id, id, booking.user_id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id, userId) {
        const [result] = await db.query('DELETE FROM bookings WHERE id = ? AND user_id = ?', [id, userId]);
        return result.affectedRows > 0;
    }

    static async getAllBookings() {
        const [rows] = await db.query(
            `SELECT bookings.*, 
                    services.name as service_name, 
                    users.username 
             FROM bookings 
             LEFT JOIN services ON bookings.service_id = services.id 
             LEFT JOIN users ON bookings.user_id = users.id 
             ORDER BY bookings.date_time DESC`
        );
        return rows;
    }
}

module.exports = Booking;
