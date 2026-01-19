const mongoose = require('../dbconnect');

const UnavailabilitySchema = new mongoose.Schema({
    unit: {
        name: { type: String, required: true },
        objectId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Unit' }
    },
    dates: { type: [String], required: true }
});

const UnavailabilityModel = mongoose.model('unavailabilities', UnavailabilitySchema);

module.exports = UnavailabilityModel;