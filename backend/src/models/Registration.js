const mongoose = require('mongoose');
const registrationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  studentName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  rollNumber: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  registeredAt: { type: Date, default: Date.now }
});
registrationSchema.index({ event: 1, email: 1 }, { unique: true });
module.exports = mongoose.model('Registration', registrationSchema);
