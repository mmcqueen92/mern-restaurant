import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div>Restaurant Name/Icon</div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/menu">Menu</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <div>Login/Profile placeholder</div>
    </div>
  );
}
