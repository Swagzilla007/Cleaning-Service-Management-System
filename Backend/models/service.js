const db = require('../config/database');

class Service {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM services ORDER BY name');
        return rows;
    }

    static async create(name) {
        const [result] = await db.query('INSERT INTO services (name) VALUES (?)', [name]);
        return result.insertId;
    }

    static async update(id, name) {
        const [result] = await db.query('UPDATE services SET name = ? WHERE id = ?', [name, id]);
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM services WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Service;
