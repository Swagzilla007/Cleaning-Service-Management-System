const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('Connected to database successfully!');

        // Insert test service
        console.log('\nInserting test data...');
        await connection.query('INSERT INTO services (name) VALUES (?)', ['Deep Cleaning']);
        
        // Insert test user
        await connection.query(
            'INSERT INTO users (username, password_hash) VALUES (?, ?)',
            ['testuser', '$2a$08$YV/Fx3RiC3G6O1R9MDYyDO1j2K7hJM/H8jYBmvXrOBBLT3T6TPAT6']
        );

        // Insert test booking
        await connection.query(
            'INSERT INTO bookings (customer_name, address, date_time, service_id, user_id) VALUES (?, ?, ?, ?, ?)',
            ['John Doe', '123 Test St', '2024-02-20 10:00:00', 1, 1]
        );

        console.log('\nRetrieving test data:');
        
        const [services] = await connection.query('SELECT * FROM services');
        console.log('Services:', services);

        const [users] = await connection.query('SELECT * FROM users');
        console.log('Users:', users);

        const [bookings] = await connection.query('SELECT * FROM bookings');
        console.log('Bookings:', bookings);

        await connection.end();
    } catch (error) {
        console.error('Error:', error);
    }
}

testConnection();
