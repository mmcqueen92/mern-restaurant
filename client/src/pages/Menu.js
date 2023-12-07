import Cart from "../components/Cart";
import MenuCategory from "../components/MenuCategory";

export default function Menu(props) {
  const {
    toggleCart,
    menu,
    addToCart,
    reduceQuantity,
    cart,
    emptyCart,
    showCart,
  } = props;

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
      <Cart
        addToCart={addToCart}
        toggleCart={toggleCart}
        showCart={showCart}
        reduceQuantity={reduceQuantity}
        cart={cart}
        emptyCart={emptyCart}
      ></Cart>
      <div className="menu">{categories}</div>
    </div>
  );
}
