import { NavLink } from "react-router-dom";
import UserProfile from "../pages/UserProfile";
import { FaHamburger } from "react-icons/fa";

export default function Navbar(props) {
  const { user, showHamburger, toggleHamburger } = props;
  return (
    <div className="bg-darkGrey navbar">
      <FaHamburger
        style={{
          color: "#CCCCCC",
          fontSize: "36px",
          margin: "5px",
          position: "absolute",
          top: "5px",
          left: "5px",
        }}
      />
      <div className="navlinks">
        <NavLink to="/">
          <button className="navbar-button">Home</button>
        </NavLink>
        <NavLink to="/menu">
          <button className="navbar-button">Menu</button>
        </NavLink>
        <NavLink to="/reservations">
          <button className="navbar-button">Reservations</button>
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
        {user && !user.isAdmin && (
          <span>
            <NavLink to="/user-profile" element={<UserProfile />}>
              <button className="navbar-button">Profile</button>
            </NavLink>
          </span>
        )}
        {user && user.isAdmin && (
          <span>
            <NavLink to="/admin/dashboard">
              <button className="navbar-button">Admin-Dashboard</button>
            </NavLink>
          </span>
        )}
        {user && (
          <span>
            <NavLink to="/logout">
              <button className="navbar-button">Log Out</button>
            </NavLink>
          </span>
        )}
      </div>
      {showHamburger && (
        <div className="hamburger-container">
          <button className="toggle-hamburger-button" onClick={toggleHamburger}>
            Hide Menu
          </button>
          <div className="hamburger-menu">
            <NavLink to="/">
              <button className="navbar-button">Home</button>
            </NavLink>
            <NavLink to="/menu">
              <button className="navbar-button">Menu</button>
            </NavLink>
            <NavLink to="/reservations">
              <button className="navbar-button">Reservations</button>
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
            {user && !user.isAdmin && (
              <span>
                <NavLink to="/user-profile" element={<UserProfile />}>
                  <button className="navbar-button">Profile</button>
                </NavLink>
              </span>
            )}
            {user && user.isAdmin && (
              <span>
                <NavLink to="/admin/dashboard">
                  <button className="navbar-button">Admin-Dashboard</button>
                </NavLink>
              </span>
            )}
            {user && (
              <span>
                <NavLink to="/logout">
                  <button className="navbar-button">Log Out</button>
                </NavLink>
              </span>
            )}
          </div>
        </div>
      )}
      {!showHamburger && (
        <div>
          <button className="toggle-hamburger-button" onClick={toggleHamburger}>
            Menu
          </button>
        </div>
      )}
    </div>
  );
}
