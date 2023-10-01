export default function ReservationTimeSlots(props) {
  const { timeSlots } = props;
  return (
    <div className="reservation-timeslots">
      <h2 className="reservation-subtitle">Available Time Slots</h2>
      <ul className="reservation-timeslot-list">
        {timeSlots.map((slot) => (
          <li key={slot._id} className="reservation-timeslot-item">
            <span className="reservation-timeslot-time">
              {new Date(slot.start_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {slot.isAvailable ? (
              <button className="reservation-book-button">Book</button>
            ) : (
              <span className="reservation-not-available">Not Available</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
