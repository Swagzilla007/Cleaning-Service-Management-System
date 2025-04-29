const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.get('/bookings', [auth, adminAuth], async (req, res) => {
    try {
        // Verify admin status again for safety
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Admin access required' });
        }
        const bookings = await Booking.getAllBookings();
        res.json(bookings);
    } catch (error) {
        console.error('Admin bookings error:', error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

module.exports = router;
