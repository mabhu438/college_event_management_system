const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, default: 'General' },
  venue: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  capacity: { type: Number, required: true, min: 1 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Event', eventSchema);
