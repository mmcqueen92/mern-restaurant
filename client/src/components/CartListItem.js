export default function CartListItem(props) {
  const item = props.item;
  const addToCart = props.addToCart;
  const reduceQuantity = props.reduceQuantity;

  return (
    <div className="cart-item">
      <div className="cart-item-top">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-price">${item.price}</p>
      </div>

      <div className="cart-item-bottom">
        <div className="cart-item-description">{item.description}</div>

        <div className="cart-quantity-buttons-container">
          <button
            onClick={() => {
              addToCart(item);
            }}
            className="cart-quantity-button"
          >
            +
          </button>
          <div className="cart-quantity">{item.quantity}</div>
          <button
            onClick={() => {
              reduceQuantity(item);
            }}
            className="cart-quantity-button"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}
