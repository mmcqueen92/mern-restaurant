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
    <div>
      {reservation.name}
      <br />
      {reservation.phone}
      <br />
      {formattedDate}
      <br />
      {reservation.numberOfPeople}
      <br />
    </div>
  );
}
