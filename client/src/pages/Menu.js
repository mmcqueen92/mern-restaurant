import MenuListItem from "../components/MenuListItem";
import Cart from "../components/Cart";

export default function Menu(props) {
  const menuItems = props.menuItems;
  const addToCart = props.addToCart;
  const reduceQuantity = props.reduceQuantity;
  const cart = props.cart;

  const menuComponents = menuItems.map((item, i) => {
    if (item.isActive === true) {
      return (
        <MenuListItem item={item} key={i} addToCart={addToCart}></MenuListItem>
      );
    }
  });
  return (
    <div>
      This is the Menu:
      <br />
      <br />
      {menuComponents}
      <br />
      This is your order:
      <br />
      <br />
      <Cart
        addToCart={addToCart}
        reduceQuantity={reduceQuantity}
        cart={cart}
      ></Cart>
    </div>
  );
}
