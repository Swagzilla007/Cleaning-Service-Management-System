const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Import routers
const auth = require('./middleware/auth');
const usersRouter = require('./routes/users');
const servicesRouter = require('./routes/services');
const bookingsRouter = require('./routes/bookings');

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Updated to match Vite's default port
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/services', servicesRouter);
app.use('/api/bookings', auth, bookingsRouter);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Cleaning Service Management System API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
