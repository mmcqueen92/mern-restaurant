import OrderItem from "./OrderItem";

export default function InProgressOrderListItem(props) {
  const {order, updateOrderStatus} = props;
  let items;
  if (order.items) {
    items = order.items.map((item, i) => {
      return <OrderItem item={item} key={i}/>;
    });
  }

  return (
    <div>
      <h4>In Progress Order</h4>
      <p>Items:</p>
      <br />
      {items}
      <br />
      Status: {order.status}
      <button onClick={() =>{
        updateOrderStatus(order._id, "en-route")
      }}>Ready</button>
    </div>
  );
  }
  