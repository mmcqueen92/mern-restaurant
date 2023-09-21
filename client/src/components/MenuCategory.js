import MenuListItem from "./MenuListItem";

export default function MenuCategory(props) {
    const {name, items, addToCart} = props;

    const itemComponents = items.map((item, i) => {
        if (item.isActive === true) {
            return (
              <MenuListItem item={item} key={i} addToCart={addToCart}></MenuListItem>
            );
          }
    })

    return (
        <div>
            <h3>{name}</h3>
            {itemComponents}
        </div>
    )
}