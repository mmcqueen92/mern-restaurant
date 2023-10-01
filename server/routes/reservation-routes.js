const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservationSchema");
const TimeSlot = require("../models/timeSlotSchema");

// POST request to create a new reservation
router.post("/", async (req, res) => {
  try {
    const { name, phone, timeSlot, numberOfPeople } = req.body;

    // Check for seat availability for the selected timeslots
    const existingReservations = await Reservation.find({
      timeSlot: {
        $in: [timeSlot, timeSlot + 1, timeSlot + 2, timeSlot + 3], // Check the selected timeslot and the following 3 timeslots
      },
    });

    const totalReservedSeats = existingReservations.reduce(
      (acc, reservation) => acc + reservation.numberOfPeople,
      0
    );

    const availableSeats = 30 - totalReservedSeats;

    if (numberOfPeople > availableSeats) {
      return res
        .status(400)
        .json({ error: "Not enough seats available for this time slot" });
    }

    // Create a new reservation
    const reservation = new Reservation({
      name,
      phone,
      timeSlot,
      numberOfPeople,
      // Add more fields as needed
    });

    // Save the reservation to the database
    await reservation.save();

    res.status(201).json(reservation); // Respond with the created reservation
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the reservation" });
  }
});

// GET request to view a reservation by :id
router.get("/find-reservation/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the reservation" });
  }
});

// DELETE request to remove a single reservation
router.delete("/:id", async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      req.params.id
    );

    if (!deletedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.status(204).send(); // Respond with a success status code
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the reservation" });
  }
});

// GET request to find all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching reservations" });
  }
});

//   GET request to search for a reservation based on date, name, or phone number
router.get("/search", async (req, res) => {
  try {
    const { date, name, phone } = req.query;

    // Create a query object to filter reservations based on provided criteria
    const query = {};

    // Add date filter if provided
    if (date) {
      query.date = date;
    }

    // Add name filter if provided
    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    // Add phone filter if provided
    if (phone) {
      query.phone = { $regex: phone, $options: "i" }; // Case-insensitive search
    }

    const reservations = await Reservation.find(query);

    res.status(200).json(reservations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while searching reservations" });
  }
});

// GET request to fetch all timeslots
router.get("/all-time-slots", async (req, res) => {
    try {
      const currentDate = new Date();
      // Set the time to the beginning of the day (midnight)
      currentDate.setHours(0, 0, 0, 0);
  
      // Find time slots where the start_time is greater than or equal to the current date
      const timeSlots = await TimeSlot.find({
        start_time: { $gte: currentDate },
      });
  
      res.status(200).json(timeSlots);
    } catch (error) {
      console.error("Error fetching time slots:", error);
      res.status(500).json({ error: "An error occurred while fetching time slots" });
    }
  });

module.exports = router;