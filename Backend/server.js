const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const auth = require('./middleware/auth');
const usersRouter = require('./routes/users');

// Routes
app.use('/api/users', usersRouter);
app.use('/api/bookings', auth, bookingsRouter);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Cleaning Service Management System API" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
