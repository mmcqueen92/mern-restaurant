export default function OrderItem(props) {
  const { item } = props;

  return (
    <div className="order-item">
      <div className="order-item-details">
        <div className="order-item-name">{item.name}</div>
        <div className="order-item-quantity">x {item.quantity}</div>
      </div>
    </div>
  );
}
