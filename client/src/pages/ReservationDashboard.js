import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReservationListItem from "../components/ReservationListItem";

export default function ReservationDashboard({user}) {
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.isAdmin) {
            fetchReservations().then((res) => setReservations(res));
        } else {
          navigate("/");
        }
      }, [user, navigate]);

    const fetchReservations = async () => {

        const fetchRes = await fetch("http://localhost:5050/reservations/");
        const fetchJson = await fetchRes.json();

        return fetchJson;
    }

    const sortedReservations = reservations.toSorted((a, b) => {
        // Convert timeSlot strings to Date objects for comparison
        const dateA = new Date(a.timeSlot);
        const dateB = new Date(b.timeSlot);
      
        // Compare the Date objects
        if (dateA < dateB) {
          return -1; // a should come before b
        } else if (dateA > dateB) {
          return 1; // a should come after b
        } else {
          return 0; // a and b are equal
        }
      });
    return (
        <div className="reservation-dashboard">
            <h1>Reservation Dashboard</h1>
            <div className="reservation-list">
                {sortedReservations.map((reservation, i) => <ReservationListItem reservation={reservation} key={i}/>)}
            </div>

        </div>
    )
}