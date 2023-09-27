import UserOrderListItem from "./UserOrderListItem";

export default function UserOrderList(props) {
    const {orderIds} = props;
    const listItems = orderIds.map((orderId, i) => {
        return <UserOrderListItem orderId={orderId} key={i}/>
    })
    return (
        <div>
            <h3>User Order List</h3>
            {listItems}
        </div>
    )
}