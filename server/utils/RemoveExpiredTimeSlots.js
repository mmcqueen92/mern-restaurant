const mongoose = require('mongoose');
const TimeSlot = require('../models/timeSlotSchema'); // Import your TimeSlot model

// MongoDB connection setup (update with your MongoDB URI)
mongoose.connect('mongodb://localhost/your-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to remove expired time slots
function removeExpiredTimeSlots() {
  const currentDate = new Date();

  // Find and delete time slots where the end_time is in the past
  TimeSlot.deleteMany({ end_time: { $lt: currentDate } })
    .then((result) => {
      console.log(`${result.deletedCount} expired time slots removed`);
      mongoose.connection.close(); // Close the MongoDB connection
    })
    .catch((error) => {
      console.error('Error removing expired time slots:', error);
      mongoose.connection.close(); // Close the MongoDB connection
    });
}

// Export the function for use in other scripts
module.exports = removeExpiredTimeSlots;
