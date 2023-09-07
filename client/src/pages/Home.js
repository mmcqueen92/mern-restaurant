import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div>Home</div>
      <div>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </div>
  );
}
