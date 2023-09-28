import { NavLink } from "react-router-dom";
import CartList from "./CartList";

export default function Cart(props) {

    const cart = props.cart;
    const addToCart = props.addToCart;
    const reduceQuantity = props.reduceQuantity;

   
    return (
        <div className="fixed top-60 right-60 border-darkGrey border-solid border-4 p-8 rounded-sm">
            <h1 className="text-3xl underline decoration-wavy decoration-from-font mb-3">Your Order:</h1>
            <CartList
            cart={cart}
            addToCart={addToCart}
            reduceQuantity={reduceQuantity}
            ></CartList>
            <NavLink to="/checkout">Checkout</NavLink>
        </div>
    )
}