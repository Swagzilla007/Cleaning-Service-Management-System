const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

router.get('/', async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from auth middleware
        const bookings = await Booking.getAll(userId);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { customer_name, address, date_time, service_id } = req.body;
        
        // Validate required fields
        if (!customer_name || !address || !date_time || !service_id) {
            return res.status(400).json({ 
                message: 'Missing required fields',
                required: ['customer_name', 'address', 'date_time', 'service_id']
            });
        }

        const userId = req.user.id; // Get user ID from auth middleware
        const booking = { 
            customer_name, 
            address, 
            date_time: new Date(date_time), 
            service_id,
            user_id: userId 
        };

        const newBookingId = await Booking.create(booking);
        res.status(201).json({ id: newBookingId });
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const userId = req.user.id;
        const bookingId = req.params.id;
        const bookingData = { ...req.body, user_id: userId };
        
        const success = await Booking.update(bookingId, bookingData);
        
        if (!success) {
            return res.status(404).json({ message: 'Booking not found or unauthorized' });
        }
        
        res.json({ message: 'Booking updated successfully' });
    } catch (error) {
        console.error('Update error:', error);
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userId = req.user.id;
        const bookingId = req.params.id;
        
        const result = await Booking.delete(bookingId, userId);
        
        if (!result) {
            return res.status(404).json({ message: 'Booking not found or unauthorized' });
        }
        
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: 'Error deleting booking' });
    }
});

module.exports = router;
