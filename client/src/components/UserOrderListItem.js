import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";

export default function UserOrderListItem(props) {
  const { orderId } = props;
  const [orderInfo, setOrderInfo] = useState();

  const fetchOrderInfo = async () => {
    const orderInfo = await fetch(
      `http://localhost:5050/api/find-order/${orderId}`,
      {
        mode: "cors",
      }
    );
    const data = await orderInfo.json();
    return data;
  };

  useEffect(() => {
    fetchOrderInfo().then((res) => setOrderInfo(res))
  }, []);

  const orderItems = orderInfo.items.map((item, i) => {
    return <OrderItem item={item} key={i}/>
  })

  return (
    <div>
      <h5>Single previous order</h5>
      Items: <br/>
      {orderItems}
    </div>
  );
}
