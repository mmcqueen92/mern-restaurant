import EnRouteOrderListItem from "./EnRouteOrdersListItem";

export default function EnRouteOrdersList(props) {
  const { orders } = props;
  let orderComponents;
  if (orders) {
    orderComponents = orders.map((order, i) => (
      <EnRouteOrderListItem order={order} key={i}/>
    ));
  }
  return (
    <div>
      En Route Orders List
      <br />
      {orderComponents}
    </div>
  );
}
