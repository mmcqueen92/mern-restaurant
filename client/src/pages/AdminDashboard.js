import { useEffect, useState } from "react";
import PaidOrdersList from "../components/PaidOrdersList";
import InProgressOrdersList from "../components/InProgressOrdersList";
import EnRouteOrdersList from "../components/EnRouteOrdersList";

export default function AdminDashboard(props) {
  const [activeOrders, setActiveOrders] = useState({});

  const fetchOrders = async () => {
    console.log("Fetching orders!");
    let data = {};

    const paid = await fetch("http://localhost:5050/api/paid-orders");
    data.paid = await paid.json();

    const inProgress = await fetch(
      "http://localhost:5050/api/in-progress-orders"
    );
    data.inProgress = await inProgress.json();

    const enRoute = await fetch("http://localhost:5050/api/en-route-orders");
    data.enRoute = await enRoute.json();

    return data;
  };

  useEffect(() => {
    fetchOrders().then((res) => setActiveOrders(res));
  }, []);

  useEffect(() => {
    console.log("Orders?: ", activeOrders);
  }, [activeOrders]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <PaidOrdersList orders={activeOrders.paid} />
      <InProgressOrdersList orders={activeOrders.inProgress} />
      <EnRouteOrdersList orders={activeOrders.enRoute} />
    </div>
  );
}
