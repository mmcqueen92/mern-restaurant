import { useEffect, useState } from "react";
import PaidOrdersList from "../components/PaidOrdersList";
import InProgressOrdersList from "../components/InProgressOrdersList";
import EnRouteOrdersList from "../components/EnRouteOrdersList";
import { useNavigate } from "react-router-dom";

export default function DeliveryDashboard({ user }) {
  const [activeOrders, setActiveOrders] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.isAdmin) {
      fetchOrders().then((res) => setActiveOrders(res));
    } else {
      navigate("/");
    }
  }, []);

  const fetchOrders = async () => {
    let data = {};

    const paid = await fetch("http://localhost:5050/api/paid-orders", {
      mode: "cors",
    });
    data.paid = await paid.json();

    const inProgress = await fetch(
      "http://localhost:5050/api/in-progress-orders",
      { mode: "cors" }
    );
    data.inProgress = await inProgress.json();

    const enRoute = await fetch("http://localhost:5050/api/en-route-orders", {
      mode: "cors",
    });
    data.enRoute = await enRoute.json();

    return data;
  };

  const updateOrderStatus = async (orderId, updatedStatus) => {
    fetch("http://localhost:5050/api/update-order-status", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        updatedStatus,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        let newState = {};
        for (const [stateKey, stateValue] of Object.entries(activeOrders)) {
          let tempStateSection = [];
          if (stateValue.length > 0 && stateValue[0].status === res.status) {
            tempStateSection.push(res);
          }
          for (const order of stateValue) {
            if (order._id !== res._id) {
              tempStateSection.push(order);
            }
          }
          newState[stateKey] = tempStateSection;
        }
        setActiveOrders(newState);
      });
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-header">Delivery Dashboard</h1>
      <div className="dashboard-order-lists-container">
        <div className="dashboard-column">
          <h2 className="dashboard-column-title">Paid Orders</h2>
          <PaidOrdersList
            orders={activeOrders.paid}
            updateOrderStatus={updateOrderStatus}
          />
        </div>
        <div className="dashboard-column">
          <h2 className="dashboard-column-title">In Progress Orders</h2>
          <InProgressOrdersList
            orders={activeOrders.inProgress}
            updateOrderStatus={updateOrderStatus}
          />
        </div>
        <div className="dashboard-column">
          <h2 className="dashboard-column-title">En Route Orders</h2>
          <EnRouteOrdersList
            orders={activeOrders.enRoute}
            updateOrderStatus={updateOrderStatus}
          />
        </div>
      </div>
      
    </div>
  );
}
