import CartList from "../components/CartList";


export default function Checkout(props) {
  const cart = props.cart;
  const addToCart = props.addToCart;
  const reduceQuantity = props.reduceQuantity;
  const address = props.address;
  const handleAddress = props.handleAddress;


  return (
    <div>
      <h2>Checkout!</h2>
      <form>
        <input type="text" placeholder="Enter your address" onChange={handleAddress} value={address}></input>
      </form>
      <CartList
        cart={cart}
        addToCart={addToCart}
        reduceQuantity={reduceQuantity}
      ></CartList>
    </div>
  );
}
