const mongoose = require('mongoose');
const generateTimeSlots = require('../utils/GenerateTimeSlots');
const TimeSlot = require('../models/timeSlotSchema');

// Initialize Mongoose and connect to your MongoDB database
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Calculate the current date and the date two weeks from now
const currentDate = new Date();
const twoWeeksFromNow = new Date();
twoWeeksFromNow.setDate(currentDate.getDate() + 14);

// Iterate through dates and generate time slots
let date = new Date(currentDate);
while (date <= twoWeeksFromNow) {
  // Check if time slots already exist for the current date
  const existingTimeSlots = await TimeSlot.find({ date });

  // If time slots do not exist for the current date, generate and insert them
  if (existingTimeSlots.length === 0) {
    const timeSlots = generateTimeSlots(date);
    // Insert time slots into the Time Slots collection
    TimeSlot.insertMany(timeSlots)
      .then(() => {
        console.log(`Time slots generated for ${date}`);
      })
      .catch((error) => {
        console.error(`Error generating time slots for ${date}: ${error}`);
      });
  }

  date.setDate(date.getDate() + 1);
}
