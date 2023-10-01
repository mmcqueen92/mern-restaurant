const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSlotSchema = new Schema({
  start_time: Date,
  end_time: Date,
  date: Date,
  capacity: Number,
  seats_booked: Number,
});

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

module.exports = TimeSlot;
