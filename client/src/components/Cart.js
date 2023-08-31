import CartList from "./CartList";

export default function Cart(props) {
    const cart = props.cart;
    const addToCart = props.addToCart;
    const reduceQuantity = props.reduceQuantity;

    let total = 0;

    if (cart.length > 0) {
        for (const item of cart) {
            total += (item.price * item.quantity);
        }

    }
    return (
        <div>
            <CartList
            cart={cart}
            addToCart={addToCart}
            reduceQuantity={reduceQuantity}
            ></CartList><br/>
            Total: ${total}
        </div>
    )
}