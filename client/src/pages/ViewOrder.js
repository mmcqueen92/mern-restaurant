import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewOrder(props) {
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState();
  const MINUTE_MS = 60000;

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(
        `http://localhost:5050/api/find-order/${id}`,
        { mode: "cors" }
      );
      const data = await response.json();
      return data;
    };
    fetchOrder().then((res) => setOrderInfo(res));
    const interval = setInterval(() => {
      fetchOrder().then((res) => {
        setOrderInfo(res[0]);
      });
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="view-order">
      <h3 className="order-title">Order {id}</h3>
      <p className="order-status">
        Order Status: {orderInfo ? orderInfo.status : "...loading"}
      </p>
    </div>
  );
}
