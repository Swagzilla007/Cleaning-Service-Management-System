-- Insert test services
INSERT INTO services (name) VALUES 
('Deep Cleaning'),
('Carpet Cleaning'),
('Window Cleaning'),
('Office Cleaning');

-- Insert test user (password: test123)
INSERT INTO users (username, password_hash) VALUES
('testuser', '$2a$08$YV/Fx3RiC3G6O1R9MDYyDO1j2K7hJM/H8jYBmvXrOBBLT3T6TPAT6');

-- Insert admin user (password: admin123)
INSERT INTO users (username, password_hash, is_admin) VALUES 
('admin', '$2a$08$YV/Fx3RiC3G6O1R9MDYyDO1j2K7hJM/H8jYBmvXrOBBLT3T6TPAT6', true);

-- Insert test bookings
INSERT INTO bookings (customer_name, address, date_time, service_id, user_id) VALUES
('John Doe', '123 Test Street', '2024-02-20 10:00:00', 1, 1),
('Jane Smith', '456 Sample Ave', '2024-02-21 14:00:00', 2, 1);
