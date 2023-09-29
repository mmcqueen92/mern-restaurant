import { NavLink } from "react-router-dom";
import burgerImage from "../images/au-cheval-burger.jpg";

export default function Home() {
  return (
    <div className="center-content">
      <img
        src={burgerImage}
        alt="Burgers, Buns, and Beyond"
      />
      <div className="overlay-content-header">
        <h1 className="restaurant-name">Burger, Bun, and Beyond</h1>
      </div>

      <div className="overlay-content-button">
        <NavLink to="/menu" className="menu-button">
          Menu
        </NavLink>
      </div>
    </div>
  );
}
