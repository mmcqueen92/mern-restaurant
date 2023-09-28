import { NavLink } from "react-router-dom";
import UserProfile from "../pages/UserProfile";
import { FaHamburger } from "react-icons/fa";

export default function Navbar(props) {
  const { logOut, user } = props;
  return (
    <div className="bg-darkGrey flex flex-row justify-center p-2 fixed top-0 w-full">

        <FaHamburger
          style={{ color: "#CCCCCC", fontSize: "36px", margin: "5px", position: "absolute", top: "5px", left: "5px"}}
        />

      <NavLink to="/">
        
        <button className="navbar-button">Home</button>
      </NavLink>
      <NavLink to="/menu">
        <button className="navbar-button">Menu</button>
      </NavLink>
      <NavLink to="/about">
        <button className="navbar-button">About</button>
      </NavLink>
      <NavLink to="/contact">
        <button className="navbar-button">Contact</button>
      </NavLink>
      {!user && (
        <span>
          <NavLink to="/login">
            <button className="navbar-button">Login</button>
          </NavLink>
          <NavLink to="/register">
            <button className="navbar-button">Register</button>
          </NavLink>
        </span>
      )}
      {user && (
        <span>
          <NavLink to="/user-profile" element={<UserProfile />}>
            <button className="navbar-button">Profile</button>
          </NavLink>
          <button onClick={logOut}>
            <button className="navbar-button">Log Out</button>
          </button>
        </span>
      )}
      {user && user.isAdmin && (
        <span>
          <NavLink to="/admin/dashboard">
            <button className="navbar-button">Admin-Dashboard</button>
          </NavLink>
          <NavLink to="/admin/edit-menu">
            <button className="navbar-button">Edit Menu</button>
          </NavLink>
        </span>
      )}
    </div>
  );
}
