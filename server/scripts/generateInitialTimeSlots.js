const mongoose = require('mongoose');
require("../loadEnvironment.js");
const generateTimeSlots = require('../utils/GenerateTimeSlots');
const TimeSlot = require('../models/timeSlotSchema');

// Initialize Mongoose and connect to your MongoDB database
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Calculate the current date and the date one week from now
const currentDate = new Date();
const oneWeekFromNow = new Date();
oneWeekFromNow.setDate(currentDate.getDate() + 7);

(async () => {
  // Iterate through dates and generate time slots
  let date = new Date(currentDate);
  while (date <= oneWeekFromNow) {
    const timeSlots = generateTimeSlots(date);

    // Split time slots into batches of 20
    const batchSize = 20;
    for (let i = 0; i < timeSlots.length; i += batchSize) {
      const batch = timeSlots.slice(i, i + batchSize);

      // Insert the batch of time slots
      try {
        await TimeSlot.insertMany(batch);
        console.log(`Time slots generated for ${date}`);
      } catch (error) {
        console.error(`Error generating time slots for ${date}: ${error}`);
      }
    }

    date.setDate(date.getDate() + 1);
  }

  // Disconnect from the database when done
  mongoose.disconnect();
})();
