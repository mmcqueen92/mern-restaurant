const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  timeSlot: { type: Date, required: true },
  numberOfPeople: { type: Number, required: true },
  // Add more fields as needed
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
