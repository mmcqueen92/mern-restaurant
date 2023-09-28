import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 className="text-6xl m-20">Burger, Bun, and Beyond</h1>
      <div>
        <NavLink to="/menu">Menu</NavLink>
      </div>
    </div>
  );
}
