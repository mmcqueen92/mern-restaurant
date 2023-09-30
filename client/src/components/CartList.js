import CartListItem from "./CartListItem";

export default function CartList(props) {
  const cart = props.cart;
  const addToCart = props.addToCart;
  const reduceQuantity = props.reduceQuantity;
  const emptyCart = props.emptyCart;

  let total = 0;
  if (cart.length > 0) {
    for (const item of cart) {
      total += item.price * item.quantity;
    }
  }

  const cartComponents = cart.map((item, i) => {
    return (
      <div key={i}>
        <CartListItem
          item={item}
          addToCart={addToCart}
          reduceQuantity={reduceQuantity}
        ></CartListItem>
      </div>
    );
  });

  return (
    <div>
      {cartComponents}
      <button className="empty-cart-button" onClick={() => emptyCart()}>
        Empty Cart
      </button>
      <div className="cart-total">Total: ${total.toFixed(2)}</div>
    </div>
  );
}
