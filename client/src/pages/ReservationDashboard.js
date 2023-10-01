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
    return (
        <div>
            <h1>Reservation Dashboard</h1>
            <div className="reservation-list">
                {reservations.map((reservation) => <ReservationListItem reservation={reservation}/>)}
            </div>

        </div>
    )
}