import CartList from "./CartList";

export default function Cart(props) {
    const setPage = props.setPage;
    const cart = props.cart;
    const addToCart = props.addToCart;
    const reduceQuantity = props.reduceQuantity;

   
    return (
        <div>
            <CartList
            cart={cart}
            addToCart={addToCart}
            reduceQuantity={reduceQuantity}
            ></CartList>
            <button onClick={() => {setPage("checkout")}}>Checkout</button>
        </div>
    )
}