export default function CartListItem(props) {
    const item = props.item;

    //     {
    //         "id": 1,
    //         "name": "Food Item 2",
    //         "description": "This is Food Item 2. Here is placeholder text describing it.",
    //         "price": 20,
    //         "category": "Mains",
    //         "quantity": 2
    //     }

    return (
        <div>
            Name: {item.name}<br/>
            Price per item: {item.price}<br/>
            Quantity: {item.quantity}<br/>
            Total: {item.price * item.quantity}<br/><br/>
        </div>
    )
}