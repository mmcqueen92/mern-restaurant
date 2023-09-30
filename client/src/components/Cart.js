import { NavLink } from "react-router-dom";
import CartList from "./CartList";

export default function Cart(props) {
  const cart = props.cart;
  const addToCart = props.addToCart;
  const reduceQuantity = props.reduceQuantity;
  const emptyCart = props.emptyCart;

  return (
    <div className="menu-page-cart">
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
          
          <NavLink to="/checkout">
            <button className="checkout-button">Checkout</button>
          </NavLink>
        </div>
      )}

      {cart.length === 0 && (
        <h1>You haven't ordered anything yet</h1>
      )}
    </div>
  );
}
