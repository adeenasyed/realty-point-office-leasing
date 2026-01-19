const mongoose = require('../dbconnect');
const BaseBookingModel = require('./BaseBookingModel');

const BoardroomBookingSchema = new mongoose.Schema({
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
});

const BoardroomBookingModel = BaseBookingModel.discriminator('BoardroomBooking', BoardroomBookingSchema);

module.exports = BoardroomBookingModel;
