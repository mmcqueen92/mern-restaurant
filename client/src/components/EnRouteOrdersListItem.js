import OrderItem from "./OrderItem";

export default function EnRouteOrderListItem(props) {
  const {order, updateOrderStatus} = props;
  let items;
  if (order.items) {
    items = order.items.map((item, i) => {
      return <OrderItem item={item} key={i} />;
    });
  }

  return (
    <div className="dashboard-list-order">
      <p className="dashboard-order-label">Items:</p>
      <div className="dashboard-order-items">{items}</div>
      <p className="dashboard-order-status">Status: {order.status}</p>
      <button
        className="dashboard-order-button"
        onClick={() => {
          updateOrderStatus(order._id, "delivered");
        }}
      >
        Start
      </button>
    </div>
  );
  }
  