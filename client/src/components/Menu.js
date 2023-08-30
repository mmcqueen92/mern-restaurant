import MenuListItem from "./MenuListItem";
import Cart from "./Cart";

export default function Menu(props) {
    const menuItems = props.menuItems;
    const addToCart = props.addToCart;
    const cart = props.cart;

    const menuComponents = menuItems.map((item, i) => {
        return <MenuListItem item={item} key={i} addToCart={addToCart}></MenuListItem>
    })
    return (
        <div>
            This is the Menu:<br/><br/>
            {menuComponents}<br/>
            This is your order:<br/><br/>
            <Cart
            cart={cart}
            ></Cart>
        </div>
    )
}