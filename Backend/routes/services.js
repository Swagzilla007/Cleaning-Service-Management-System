const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.get('/', async (req, res) => {
    try {
        const services = await Service.getAll();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name || !name.trim()) {
            return res.status(400).json({ message: 'Service name is required' });
        }

        console.log('Creating service:', name); // Debug log
        const newServiceId = await Service.create(name);
        console.log('Service created with ID:', newServiceId); // Debug log

        res.status(201).json({ id: newServiceId, name });
    } catch (error) {
        console.error('Service creation error:', error);
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', auth, adminAuth, async (req, res) => {
    try {
        const success = await Service.update(req.params.id, req.body.name);
        if (success) {
            res.json({ message: 'Service updated' });
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', auth, adminAuth, async (req, res) => {
    try {
        const success = await Service.delete(req.params.id);
        if (success) {
            res.json({ message: 'Service deleted' });
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
