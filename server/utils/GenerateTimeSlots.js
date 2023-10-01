// Define your logic to generate time slots here
function generateTimeSlots(date) {
    // Set the opening and closing times
    const openingTime = new Date(date);
    openingTime.setHours(17, 0, 0, 0); // 5:00 PM
  
    const closingTime = new Date(date);
    closingTime.setHours(23, 0, 0, 0); // 9:00 PM
  
    // Set the time interval (30 minutes)
    const timeInterval = 30 * 60 * 1000; // 30 minutes in milliseconds
  
    // Initialize an array to store the time slots
    const timeSlots = [];
  
    // Iterate from opening time to closing time with the specified interval
    let currentTime = new Date(openingTime);
    while (currentTime < closingTime) {
      // Calculate the end time of the time slot
      const endTime = new Date(currentTime.getTime() + timeInterval);
  
      // Create a time slot object
      const timeSlot = {
        start_time: currentTime,
        end_time: endTime,
        date: date,
        capacity: 30, // Maximum capacity
        seats_booked: 0, // Initially, no seats are booked
      };
  
      // Add the time slot to the array
      timeSlots.push(timeSlot);
  
      // Move to the next time interval
      currentTime = endTime;
    }
  
    return timeSlots;
  }
  
module.exports = generateTimeSlots;