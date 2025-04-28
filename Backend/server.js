const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));
app.use(express.json());

const auth = require('./middleware/auth');
const usersRouter = require('./routes/users');
const servicesRouter = require('./routes/services');

// Routes
app.use('/api/users', usersRouter);
app.use('/api/bookings', auth, bookingsRouter);
app.use('/api/services', servicesRouter);

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
