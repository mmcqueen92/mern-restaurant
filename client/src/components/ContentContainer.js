import Menu from "./Menu";
import About from "./About";
import Contact from "./Contact";

export default function ContentContainer(props) {
    const page = props.page;
    const menuItems = props.menuItems;
    const addToCart = props.addToCart;
    const cart = props.cart;


    if (page==="about") {
        return (
            <div>
               <About></About>
            </div>
        )
    } else if (page==="contact") {
        return (
            <div>
                <Contact></Contact>
            </div>
        )
    } else if (page==="menu") {
        return (
            <div>
                <Menu
                menuItems={menuItems}
                addToCart={addToCart}
                cart={cart}
                ></Menu>
            </div>
        )
    }

}