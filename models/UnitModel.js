const mongoose = require('../dbconnect');

const UnitSchema = new mongoose.Schema({
    name: String,
    type: String,
    size: String,
    hourly_rent: Number,
    daily_rent: Number,
    monthly_rent: Number,
    images: [String]
});

const UnitModel = mongoose.model('Unit', UnitSchema);

module.exports = UnitModel;