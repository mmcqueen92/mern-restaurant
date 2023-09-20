import PaidOrderListItem from "./PaidOrderListItem";

export default function PaidOrdersList(props) {
  const { orders, activeOrders, setActiveOrders, updateActiveOrders, updateOrderStatus } = props;
  let orderComponents;
  if (orders) {
    orderComponents = orders.map((order, i) => (
      <PaidOrderListItem order={order} key={i} activeOrders={activeOrders} setActiveOrders={setActiveOrders} updateActiveOrders={updateActiveOrders} updateOrderStatus={updateOrderStatus}/>
    ));
  }
  return (
    <div>
      Paid Orders List
      <br />
      {orderComponents}
    </div>
  );
}
