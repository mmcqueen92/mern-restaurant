import PaidOrderListItem from "./PaidOrderListItem";

export default function PaidOrdersList(props) {
  const { orders } = props;
  let orderComponents;
  if (orders) {
    orderComponents = orders.map((order, i) => (
      <PaidOrderListItem order={order} key={i}/>
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
