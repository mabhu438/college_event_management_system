const router = require('express').Router();
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const adminAuth = require('../middleware/auth');
router.post('/', async (req, res, next) => {
  try {
    const { eventId, studentName, email, rollNumber, department } = req.body;
    if (!eventId || !studentName || !email || !rollNumber || !department) return res.status(400).json({ message: 'Please complete all registration fields' });
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const count = await Registration.countDocuments({ event: eventId });
    if (count >= event.capacity) return res.status(409).json({ message: 'This event is full' });
    const registration = await Registration.create({ event: eventId, studentName, email, rollNumber, department });
    res.status(201).json({ message: 'Registration successful', registration });
  } catch (e) { if (e.code === 11000) return res.status(409).json({ message: 'This email is already registered for this event' }); next(e); }
});
router.get('/', adminAuth, async (req, res, next) => {
  try { const filter = req.query.eventId ? { event: req.query.eventId } : {}; const rows = await Registration.find(filter).populate('event', 'title date venue').sort({ registeredAt: -1 }); res.json(rows); }
  catch (e) { next(e); }
});
router.delete('/:id', adminAuth, async (req, res, next) => {
  try { const row = await Registration.findByIdAndDelete(req.params.id); if (!row) return res.status(404).json({ message: 'Registration not found' }); res.json({ message: 'Registration removed' }); }
  catch (e) { next(e); }
});
module.exports = router;
