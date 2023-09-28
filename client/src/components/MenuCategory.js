import MenuListItem from "./MenuListItem";

export default function MenuCategory(props) {
  const { name, items, addToCart } = props;

  const titleCase = (str) => {
    const string = str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word[0].toUpperCase() + word.substr(1, word.length);
      })
      .join(" ");
    return string;
  };

  const itemComponents = items.map((item, i) => {
    if (item.isActive === true) {
      return (
        <MenuListItem item={item} key={i} addToCart={addToCart}></MenuListItem>
      );
    }
  });

  return (
    <div className="border-4 border-darkGrey m-2">
      <h1 className="text-3xl">{titleCase(name)}</h1>
      {itemComponents}
    </div>
  );
}
