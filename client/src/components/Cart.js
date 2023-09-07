import { NavLink } from "react-router-dom";
import CartList from "./CartList";

export default function Cart(props) {

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
            <NavLink to="/checkout">Checkout</NavLink>
        </div>
    )
}