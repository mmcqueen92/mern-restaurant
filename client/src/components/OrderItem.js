export default function OrderItem(props) {
  const {item} = props;
  return (
    <div>
      <h5>1 item!</h5>
      {item.name} x{item.quantity}
    </div>
  );
}
