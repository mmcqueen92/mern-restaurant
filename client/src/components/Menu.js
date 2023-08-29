import MenuListItem from "./MenuListItem";

export default function Menu(props) {
    const menuItems = props.menuItems;
    const addToCart = props.addToCart;

    const menuComponents = menuItems.map((item, i) => {
        return <MenuListItem item={item} key={i} addToCart={addToCart}></MenuListItem>
    })
    return (
        <div>
            This is the Menu:<br/><br/>
            {menuComponents}
        </div>
    )
}