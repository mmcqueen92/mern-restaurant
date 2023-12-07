import { NavLink } from "react-router-dom";
import CartList from "./CartList";

export default function Cart(props) {
  const { cart, showCart, addToCart, toggleCart, reduceQuantity, emptyCart } =
    props;
  console.log("SHOW CART?", showCart);

  let total = 0;
  for (let item of cart) {
    total += item.price * item.quantity;
  }

  const roundedTotal = total.toFixed(2);

  if (showCart) {
    return (
      <div className="menu-page-cart">
        <button className="toggle-cart-button" onClick={toggleCart}>
          Hide Cart
        </button>
        <h1 className="text-3xl underline decoration-wavy decoration-from-font mb-3">
          Your Order:
        </h1>
        {cart.length > 0 && (
          <div>
            <CartList
              cart={cart}
              addToCart={addToCart}
              reduceQuantity={reduceQuantity}
              emptyCart={emptyCart}
            ></CartList>
            <div>Total: ${roundedTotal}</div>

            <NavLink to="/checkout">
              <button className="checkout-button">Checkout</button>
            </NavLink>
          </div>
        )}

        {cart.length === 0 && <h1>You haven't ordered anything yet</h1>}
      </div>
    );
  } else {
    return (
      <div className="toggle-cart-button">
        <button onClick={toggleCart}>Show Cart</button>
      </div>
    );
  }
}
