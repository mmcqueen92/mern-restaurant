import { useEffect, useState } from "react";
import PaidOrdersList from "../components/PaidOrdersList";
import InProgressOrdersList from "../components/InProgressOrdersList";
import EnRouteOrdersList from "../components/EnRouteOrdersList";

export default function AdminDashboard(props) {
  const [activeOrders, setActiveOrders] = useState({});

  const fetchOrders = async () => {
    let data = {};

    const paid = await fetch("http://localhost:5050/api/paid-orders", {mode: 'cors'});
    data.paid = await paid.json();

    const inProgress = await fetch(
      "http://localhost:5050/api/in-progress-orders", {mode: 'cors'}
    );
    data.inProgress = await inProgress.json();

    const enRoute = await fetch("http://localhost:5050/api/en-route-orders", {mode: 'cors'});
    data.enRoute = await enRoute.json();

    return data;
  };

  useEffect(() => {
    fetchOrders().then((res) => setActiveOrders(res));
  }, []);

  // for testing purposes
  // useEffect(() => {
  //   console.log("Orders?: ", activeOrders);
  // }, [activeOrders]);

  const updateOrderStatus = async (orderId, updatedStatus) => {
    fetch("http://localhost:5050/api/update-order-status", {
      method: "POST",
      mode: 'cors',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        orderId: orderId,
        updatedStatus: updatedStatus
      })
    })
    .then((res) => res.json())
    .then((res) => {
      let newState = {};
      for (const [stateKey, stateValue] of Object.entries(activeOrders)) {
        let tempStateSection = [];
        if (stateValue.length > 0 && stateValue[0].status === res.status) {
          tempStateSection.push(res)
        }
        for (const order of stateValue) {
          if (order._id !== res._id) {
            tempStateSection.push(order)
          }
        }
        newState[stateKey] = tempStateSection
      };
      setActiveOrders(newState);
    })
    

  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <PaidOrdersList orders={activeOrders.paid} updateOrderStatus={updateOrderStatus}/>
      <InProgressOrdersList orders={activeOrders.inProgress} updateOrderStatus={updateOrderStatus}/>
      <EnRouteOrdersList orders={activeOrders.enRoute} updateOrderStatus={updateOrderStatus}/>
    </div>
  );
}
