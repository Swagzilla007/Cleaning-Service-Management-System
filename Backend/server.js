const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const bookingsRouter = require('./routes/bookings');
app.use('/api/bookings', bookingsRouter);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Cleaning Service Management System API" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
