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
    <div className="border-4 border-darkGrey m-2 capitalize rounded-sm">
      <h1 className="text-3xl underline decoration-wavy decoration-from-font my-3">{name}</h1>
      {itemComponents}
    </div>
  );
}
