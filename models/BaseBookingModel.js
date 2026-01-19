const mongoose = require('../dbconnect');

const BaseBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  // phoneNumber: { type: String, required: true },
  unit: {
      name: { type: String, required: true },
      objectId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Unit' }
  }
}, { discriminatorKey: 'type' });

const BaseBookingModel = mongoose.model('Booking', BaseBookingSchema);

module.exports = BaseBookingModel;
