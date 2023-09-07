import Menu from "../pages/Menu";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Checkout from "../pages/Checkout";

export default function ContentContainer(props) {
  const page = props.page;
  const setPage = props.setPage;
  const menuItems = props.menuItems;
  const addToCart = props.addToCart;
  const cart = props.cart;
  const reduceQuantity = props.reduceQuantity;
  const address = props.address;
  const handleAddress = props.handleAddress;

  if (page === "about") {
    return (
      <div>
        <About></About>
      </div>
    );
  } else if (page === "contact") {
    return (
      <div>
        <Contact></Contact>
      </div>
    );
  } else if (page === "menu") {
    return (
      <div>
        <Menu
          setPage={setPage}
          menuItems={menuItems}
          addToCart={addToCart}
          reduceQuantity={reduceQuantity}
          cart={cart}
        ></Menu>
      </div>
    );
  } else if (page === "checkout") {
    return (
      <Checkout
        cart={cart}
        addToCart={addToCart}
        reduceQuantity={reduceQuantity}
        address={address}
        handleAddress={handleAddress}
      ></Checkout>
    );
  }
}
