import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewOrder(props) {
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(
        `http://localhost:5050/api/find-order/${id}`
      );
      const data = await response.json();
      return data;
    };
    fetchOrder().then((res) => setOrderInfo(res[0]));
  }, [id]);

  return (
    <div>
      <h3>Order {id}</h3>
      <p>Order Status: {orderInfo ? orderInfo.status : "...loading"}</p>
    </div>
  );
}
