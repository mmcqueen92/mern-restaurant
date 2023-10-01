import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function AdminDashboard({ user }) {
  const [activeOrders, setActiveOrders] = useState({});
  const navigate = useNavigate();

  

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-header">Admin Dashboard</h1>

      <NavLink to="/admin/edit-menu" className="admin-dashboard-button">
        Edit Menu
      </NavLink>
      <NavLink
        to="/admin/delivery-dashboard"
        className="admin-dashboard-button"
      >
        Delivery Dashboard
      </NavLink>
      <NavLink
        to="/admin/reservation-dashboard"
        className="admin-dashboard-button"
      >
        Reservations
      </NavLink>
    </div>
  );
}
