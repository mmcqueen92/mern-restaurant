import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

export default function ViewOrder(props) {
    const {id} = useParams();
    const [orderInfo, setOrderInfo] = useState({});

    const fetchOrder = async () => {
        const response = await fetch(`http://localhost:5050/api/find-order/${id}`);
        const data = await response.json();
        return data;
      };

    useEffect(() => {
        fetchOrder().then((res) => setOrderInfo(res));
    }, [])
    return(
        <div>
            <h3>Order {id}</h3>
            <p>Order Status: {orderInfo[0].status}</p>

        </div>
    )
}