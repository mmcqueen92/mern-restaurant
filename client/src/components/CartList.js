import CartListItem from "./CartListItem";

export default function CartList(props) {
  const cart = props.cart;

  const cartComponents = cart.map((item, i) => {
    return <CartListItem item={item} key={i}></CartListItem>;
  });

  return <div>{cartComponents}</div>;
}
