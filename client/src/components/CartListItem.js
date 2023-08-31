export default function CartListItem(props) {
    const item = props.item;
    const addToCart = props.addToCart;
    const reduceQuantity = props.reduceQuantity;

    return (
        <div>
            Name: {item.name}<br/>
            Price per item: ${item.price}<br/>
            Quantity: {item.quantity}<br/>
            <button onClick={() => {addToCart(item)}}>Increase Quantity</button><br/>
            <button onClick={() => {reduceQuantity(item)}}>Reduce Quantity</button><br/>
            Total: ${item.price * item.quantity}<br/><br/>
        </div>
    )
}