import Cart from "../components/Cart";
import MenuCategory from "../components/MenuCategory";

export default function Menu(props) {
  const menu = props.menu;
  const addToCart = props.addToCart;
  const reduceQuantity = props.reduceQuantity;
  const cart = props.cart;

  let sortedMenu = {};
  for (let item of menu) {
    if (sortedMenu[item.category] === undefined) {
      sortedMenu[item.category] = [item]
    } else {
      sortedMenu[item.category].push(item)
    }
  }
  let categories = [];
  for (const [key, value] of Object.entries(sortedMenu)) {
    const category = <MenuCategory name={key} items={value} addToCart={addToCart} key={categories.length + 1}/>
    categories.push(category)
  }

  return (
    <div>
      This is the Menu:
      <br />
      <br />
      {categories}
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
