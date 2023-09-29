import MenuListItem from "./MenuListItem";

export default function MenuCategory(props) {
  const { name, items, addToCart } = props;

  const itemComponents = items.map((item, i) => {
    if (item.isActive === true) {
      return (
        <MenuListItem item={item} key={i} addToCart={addToCart}></MenuListItem>
      );
    }
  });

  return (
    <div className="menu-category">
      <h1 className="text-4xl underline decoration-wavy decoration-from-font my-3 pt-5">{name}</h1>
      {itemComponents}
    </div>
  );
}
