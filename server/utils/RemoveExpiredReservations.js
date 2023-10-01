const mongoose = require('mongoose');
const Reservation = require('../models/reservationSchema'); // Import your Reservation model

// Function to remove expired reservations
function removeExpiredReservations() {
  const currentDate = new Date();

  // Find and delete reservations where the timeSlot is in the past
  Reservation.deleteMany({ timeSlot: { $lt: currentDate } })
    .then((result) => {
      console.log(`${result.deletedCount} expired reservations removed`);
    })
    .catch((error) => {
      console.error('Error removing expired reservations:', error);
    });
}

// Export the function for use in other scripts
module.exports = removeExpiredReservations;
