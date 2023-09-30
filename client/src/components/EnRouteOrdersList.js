import EnRouteOrderListItem from "./EnRouteOrdersListItem";

export default function EnRouteOrdersList(props) {
  const { orders, updateOrderStatus } = props;
  let orderComponents;
  if (orders) {
    orderComponents = orders.map((order, i) => (
      <EnRouteOrderListItem order={order} key={i} updateOrderStatus={updateOrderStatus}/>
    ));
  }
  return (
    <div>
      {orderComponents}
    </div>
  );
}
