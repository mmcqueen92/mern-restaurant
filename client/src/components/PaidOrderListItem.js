import OrderItem from "./OrderItem";

export default function PaidOrderListItem(props) {
  const {order, updateActiveOrders, updateOrderStatus} = props;
  let items;
  if (order.items) {
    items = order.items.map((item) => {
      return <OrderItem item={item} />;
    });
  }

  return (
    <div>
      <h4>Single Paid Order</h4>
      <p>Items:</p>
      <br />
      {items}
      <br />
      Status: {order.status}
      <button onClick={() =>{
        updateOrderStatus(order._id, "in-progress")
      }}>Start</button>
    </div>
  );
}
