const router = require('express').Router();
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const adminAuth = require('../middleware/auth');

router.get('/', async (_req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    const counts = await Registration.aggregate([{ $group: { _id: '$event', count: { $sum: 1 } } }]);
    const countMap = Object.fromEntries(counts.map(x => [String(x._id), x.count]));
    res.json(events.map(e => ({ ...e.toObject(), registeredCount: countMap[String(e._id)] || 0 })));
  } catch (e) { next(e); }
});
router.get('/:id', async (req, res, next) => {
  try { const event = await Event.findById(req.params.id); if (!event) return res.status(404).json({ message: 'Event not found' }); res.json(event); }
  catch (e) { next(e); }
});
router.post('/', adminAuth, async (req, res, next) => {
  try { const event = await Event.create(req.body); res.status(201).json(event); }
  catch (e) { next(e); }
});
router.put('/:id', adminAuth, async (req, res, next) => {
  try { const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!event) return res.status(404).json({ message: 'Event not found' }); res.json(event); }
  catch (e) { next(e); }
});
router.delete('/:id', adminAuth, async (req, res, next) => {
  try { const event = await Event.findByIdAndDelete(req.params.id); if (!event) return res.status(404).json({ message: 'Event not found' }); await Registration.deleteMany({ event: event._id }); res.json({ message: 'Event and its registrations deleted' }); }
  catch (e) { next(e); }
});
module.exports = router;
