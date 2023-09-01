import CartList from "./CartList";

export default function Checkout(props) {
  const cart = props.cart;
  const addToCart = props.addToCart;
  const reduceQuantity = props.reduceQuantity;
  
  return (
    <div>
      <h2>Checkout!</h2>
      <CartList
        cart={cart}
        addToCart={addToCart}
        reduceQuantity={reduceQuantity}
      ></CartList>
    </div>
  );
}
