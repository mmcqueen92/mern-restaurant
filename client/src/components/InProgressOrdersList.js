import InProgressOrderListItem from "./InProgressOrdersListItem";

export default function InProgressOrdersList(props) {
  const { orders, updateOrderStatus } = props;
  let orderComponents;
  if (orders) {
    orderComponents = orders.map((order, i) => (
      <InProgressOrderListItem order={order} key={i} updateOrderStatus={updateOrderStatus}/>
    ));
  }
  return (
    <div>
      {orderComponents}
    </div>
  );
}
