import CartListItem from "./CartListItem";

export default function CartList(props) {
  const cart = props.cart;
  const addToCart = props.addToCart;
  const reduceQuantity = props.reduceQuantity;
  const emptyCart = props.emptyCart;

  

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
    </div>
  );
}
