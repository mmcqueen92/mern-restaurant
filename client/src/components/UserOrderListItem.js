import { useEffect, useState } from "react";

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

  return (
    <div>
      <h3>Single previous order</h3>
    </div>
  );
}
