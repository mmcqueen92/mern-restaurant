import CartList from "../components/CartList";
import { NavLink } from "react-router-dom";

export default function Checkout(props) {
  const {
    cart,
    addToCart,
    reduceQuantity,
    address,
    handleAddress,
    email,
    handleEmail,
  } = props;

  let itemTotal = 0;
  if (cart.length > 0) {
    for (const item of cart) {
      itemTotal += item.price * item.quantity;
    }
  }

  const taxRate = 0.05;
  const cartTax = itemTotal * taxRate;
  const total = itemTotal + cartTax + 5;

  return (
    <div className="checkout-container">
      <h2>Checkout!</h2>
      <form>
        <input
          type="text"
          placeholder="Enter an email"
          onChange={handleEmail}
          value={email}
        ></input>
        <input
          type="text"
          placeholder="Enter your address"
          onChange={handleAddress}
          value={address}
        ></input>
      </form>
      <CartList
        cart={cart}
        addToCart={addToCart}
        reduceQuantity={reduceQuantity}
      ></CartList>
      <div className="cost-breakdown">
        <div className="cost-breakdown-labels">
          Item Total:
          <br />
          Tax ({taxRate * 100}%):
          <br />
          Delivery Fee:
          <br />
          <div className="total-section">Total:</div>
        </div>
        <div className="cost-breakdown-values">
          ${itemTotal}
          <br />${cartTax.toFixed(2)}
          <br />
          $5
          <br />
          <div className="total-section">${total.toFixed(2)}</div>
        </div>
      </div>
      <button className="payment-button">
        <NavLink to="/payment">Pay</NavLink>
      </button>
    </div>
  );
}
