const mongoose = require('../dbconnect');
const BaseBookingModel = require('./BaseBookingModel');

const MonthlyBookingSchema = new mongoose.Schema({
    months: { type: [String], required: true }
});

const MonthlyBookingModel = BaseBookingModel.discriminator('MonthlyBooking', MonthlyBookingSchema);

module.exports = MonthlyBookingModel;