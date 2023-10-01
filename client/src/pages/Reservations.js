import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import ReservationForm from "../components/ReservationForm";
import ReservationMessage from "../components/ReservationMessage";

export default function ReservationPage() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [showReservationMessage, setShowReservationMessage] = useState(false);
  const [reservationMessage, setReservationMessage] = useState("");

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
  };

  return (
    <div className="reservation-page">
      <div className="calendar-container">
        <Calendar
          value={selectedDate}
          tileClassName={tileClassName}
          onClickDay={(date) => setSelectedDate(date)}
          className="calendar"
        />
        <div className="reservation-page-bottom">
          <ul className="selected-date-info">
            {" "}
            {/* Moved ul outside */}
            <h2>Available Time Slots</h2>
            {selectedDate ? <h1>{selectedDate.toDateString()}</h1> : <></>}
            {getTimeSlotsForSelectedDate(selectedDate).map((timeSlot) => (
              <div
                key={timeSlot._id}
                className={`time-slot ${
                  timeSlot.seats_booked <= 28 ? "available" : "unavailable"
                }`}
                onClick={() => handleTimeSlotClick(timeSlot)}
              >
                <div className="time">
                  {timeSlot.start_time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                </div>
                {timeSlot.seats_booked <= 28 && (
                  <div className="seats-available">
                    {30 - timeSlot.seats_booked} seats available
                  </div>
                )}
              </div>
            ))}
          </ul>
          {showReservationForm && selectedTimeSlot && (
            <ReservationForm
              timeSlot={selectedTimeSlot}
              onClose={() => setShowReservationForm(false)}
              setShowReservationMessage={setShowReservationMessage}
              setReservationMessage={setReservationMessage}
              setShowReservationForm={setShowReservationForm}
            />
          )}
        </div>

        {showReservationMessage && (
          <ReservationMessage message={reservationMessage} />
        )}
      </div>
    </div>
  );
}
