import imageUrl from "../images/garden-burger.jpg";

export default function MenuListItem(props) {
  const addToCart = props.addToCart;
  const item = props.item;
  const name = item.name;
  const price = item.price;
  const description = item.description;

  return (
    <div className="menu-item">
      <div className="menu-item-left">
        <div className="menu-item-left-top">
          <div className="menu-item-name">{name}</div>
          <div className="menu-item-price">${price}</div>
        </div>
        <div className="menu-item-description">{description}</div>
      </div>

      <div className="menu-item-right">
        <img src={imageUrl} alt="Item" className="menu-item-image" />
        <div className="button-wrapper">
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
    </div>
  );
}
