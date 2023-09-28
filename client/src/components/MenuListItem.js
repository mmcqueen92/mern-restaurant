export default function MenuListItem(props) {
  const addToCart = props.addToCart;
  const item = props.item;
  const name = item.name;
  const price = item.price;
  const description = item.description;

  return (
    <div className="menu-item">
      <div className="menu-item-top">
        <div className="menu-item-name">{name}</div>
        <div className="menu-item-price">${price}</div>
      </div>

      <div className="menu-item-bottom">
        <div className="menu-item-description">{description}</div>
        <button
          className="cart-button"
          onClick={() => {
            addToCart(item);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
