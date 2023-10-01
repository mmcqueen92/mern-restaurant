export default function ReservationListItem({ reservation }) {

  const reservationDate = new Date(reservation.timeSlot);

  // Define options for formatting the date and time
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // Use 24-hour format
  };

  // Convert the Date object to a readable string
  const formattedDate = reservationDate.toLocaleString("en-US", options);
  return (
    <div className="reservation-list-item">
      <div>
        <strong>Name:</strong> {reservation.name}
      </div>
      <div>
        <strong>Phone:</strong> {reservation.phone}
      </div>
      <div>
        <strong>Date:</strong> {formattedDate}
      </div>
      <div>
        <strong>Number of People:</strong> {reservation.numberOfPeople}
      </div>
    </div>
  );
}
