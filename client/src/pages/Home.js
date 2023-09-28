import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div>Burger, Bun, and Beyond</div>
      <div>
        <NavLink to="/menu">Menu</NavLink>
      </div>
    </div>
  );
}
