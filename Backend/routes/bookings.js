const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');


router.get('/', async (req, res) => {
    try {
       
        const userId = 1; 
        const bookings = await Booking.getAll(userId);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    try {
       
        const userId = 1; 
        const booking = { ...req.body, user_id: userId };
        const newBookingId = await Booking.create(booking);
        res.status(201).json({ id: newBookingId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        
        const userId = 1; 
        const success = await Booking.update(req.params.id, { ...req.body, user_id: userId });
        if (success) {
            res.json({ message: 'Booking updated' });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        
        const userId = 1; 
        const success = await Booking.delete(req.params.id, userId);
        if (success) {
            res.json({ message: 'Booking deleted' });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
