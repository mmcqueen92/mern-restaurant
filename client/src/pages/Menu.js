import Cart from "../components/Cart";
import MenuCategory from "../components/MenuCategory";
import { useEffect } from "react";

export default function Menu(props) {
  const menu = props.menu;
  const addToCart = props.addToCart;
  const reduceQuantity = props.reduceQuantity;
  const cart = props.cart;

  let sortedMenu = {};
  for (let item of menu) {
    if (sortedMenu[item.category] === undefined) {
      sortedMenu[item.category] = [item];
    } else {
      sortedMenu[item.category].push(item);
    }
  }
  let categories = [];
  for (const [key, value] of Object.entries(sortedMenu)) {
    const category = (
      <MenuCategory
        name={key}
        items={value}
        addToCart={addToCart}
        key={categories.length + 1}
      />
    );
    categories.push(category);
  }

  return (
    <div className="menu-container">
      <div className="menu">{categories}</div>

        <Cart
          addToCart={addToCart}
          reduceQuantity={reduceQuantity}
          cart={cart}
        ></Cart>

    </div>
  );
}
