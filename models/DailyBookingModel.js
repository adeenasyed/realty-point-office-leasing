const mongoose = require('../dbconnect');
const BaseBookingModel = require('./BaseBookingModel');

const DailyBookingSchema = new mongoose.Schema({
    dates: { type: [String], required: true }
});

const DailyBookingModel = BaseBookingModel.discriminator('DailyBooking', DailyBookingSchema);

module.exports = DailyBookingModel;
  