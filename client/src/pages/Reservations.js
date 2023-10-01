import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import ReservationForm from "../components/ReservationForm";

export default function ReservationPage() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);

  useEffect(() => {
    // Fetch all time slots from the backend
    fetch("http://localhost:5050/reservations/all-time-slots")
      .then((response) => response.json())
      .then((data) => {
        // Ensure that data is an array before setting it
        if (Array.isArray(data)) {
          // Parse date strings into Date objects
          const parsedTimeSlots = data.map((timeSlot) => ({
            ...timeSlot,
            start_time: new Date(timeSlot.start_time),
            end_time: new Date(timeSlot.end_time),
            date: new Date(timeSlot.date),
          }));
          setTimeSlots(parsedTimeSlots);
        } else {
          console.error("Invalid data received:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching time slots:", error);
      });
  }, []);

  // Function to check if a date has available time slots
  const hasAvailableTimeSlots = (date) => {
    return timeSlots.some(
      (timeSlot) =>
        timeSlot.date.toDateString() === date.toDateString() &&
        30 - timeSlot.seats_booked >= 2
    );
  };

  // Function to filter time slots for the selected date
  const getTimeSlotsForSelectedDate = (date) => {
    return timeSlots.filter(
      (timeSlot) =>
        timeSlot.date.toDateString() === date.toDateString() &&
        30 - timeSlot.seats_booked >= 2
    );
  };

  // Function to style calendar tile based on availability
  const tileClassName = ({ date }) => {
    const classNames = ["calendar-cell"];
    if (hasAvailableTimeSlots(date)) {
      classNames.push("available");
    } else {
      classNames.push("unavailable");
    }
    return classNames.join(" ");
  };

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setShowReservationForm(true);
    console.log("Selected timeSlot._id:", timeSlot._id);
    console.log("TYPEOF Selected timeSlot._id:", typeof timeSlot._id);
  };

  return (
    <div className="reservation-page">
      <h2>Available Time Slots</h2>
      <div className="calendar-container">
        <Calendar
          value={selectedDate}
          tileClassName={tileClassName}
          onClickDay={(date) => setSelectedDate(date)}
        />
        <ul className="selected-date-info"> {/* Moved ul outside */}
          {getTimeSlotsForSelectedDate(selectedDate).map((timeSlot) => (
            <li
              key={timeSlot._id}
              className={
                timeSlot.seats_booked >= 2 ? "available" : "unavailable"
              }
              onClick={() => handleTimeSlotClick(timeSlot)}
            >
              {timeSlot.start_time.toLocaleTimeString()} -{" "}
              {timeSlot.end_time.toLocaleTimeString()}
              {timeSlot.seats_booked >= 2 && (
                <span className="seats-available">
                  {30 - timeSlot.seats_booked} seats available
                </span>
              )}
            </li>
          ))}
        </ul>
        {showReservationForm && selectedTimeSlot && (
          <ReservationForm
            timeSlot={selectedTimeSlot}
            onClose={() => setShowReservationForm(false)}
          />
        )}
      </div>
    </div>
  );
}
