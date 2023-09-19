import CartList from "../components/CartList";
import { NavLink } from "react-router-dom";

export default function Checkout(props) {
  const {cart, addToCart, reduceQuantity, address, handleAddress, email, handleEmail } = props;

  return (
    <div>
      <h2>Checkout!</h2>
      <form>
        <input
          type="text"
          placeholder="Enter your address"
          onChange={handleAddress}
          value={address}
        ></input>
        <input
          type="text"
          placeholder="Enter an email"
          onChange={handleEmail}
          value={email}
        ></input>
      </form>
      <CartList
        cart={cart}
        addToCart={addToCart}
        reduceQuantity={reduceQuantity}
      ></CartList>
      <button>
        <NavLink to="/payment">Pay</NavLink>
      </button>
    </div>
  );
}
