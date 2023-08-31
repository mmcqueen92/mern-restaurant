import CartListItem from "./CartListItem";

export default function CartList(props) {
  const cart = props.cart;
  const addToCart = props.addToCart;
  const reduceQuantity = props.reduceQuantity;

  const cartComponents = cart.map((item, i) => {
    return (
      <CartListItem
        item={item}
        key={i}
        addToCart={addToCart}
        reduceQuantity={reduceQuantity}
      ></CartListItem>
    );
  });

  return <div>{cartComponents}</div>;
}
