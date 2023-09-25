import { NavLink } from "react-router-dom";

export default function Navbar(props) {
  const { logOut, user } = props;
  return (
    <div>
      <div>Restaurant Name/Icon</div>
      <NavLink to="/">Home </NavLink>
      <NavLink to="/menu">Menu </NavLink>
      <NavLink to="/about">About </NavLink>
      <NavLink to="/contact">Contact </NavLink>
      {!user && (
        <div>
          <NavLink to="/login">Login </NavLink>
          <NavLink to="/register">Register </NavLink>
        </div>
      )}
      {user && <button onClick={logOut}>Log Out</button>}
      <br />
      {user && user.isAdmin && (
        <div>
          <NavLink to="/admin/dashboard">Admin-Dashboard </NavLink>
          <NavLink to="/admin/edit-menu">Edit-Menu </NavLink>
        </div>
      )}
    </div>
  );
}
