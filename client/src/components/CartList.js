import CartListItem from "./CartListItem";

export default function CartList(props) {
  const cart = props.cart;
  const addToCart = props.addToCart;
  const reduceQuantity = props.reduceQuantity;

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
        Total: ${total}
      </div>
    );
  });

  return <div>{cartComponents}</div>;
}
