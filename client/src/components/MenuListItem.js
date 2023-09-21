export default function MenuListItem(props) {
    const addToCart = props.addToCart;
    const item = props.item;
    const name = item.name;
    const price = item.price;
    const description = item.description;


    return (
        <div>
            Food name: {name}<br/>
            Food price: ${price}<br/>
            Food description: {description}<br/>
            <button onClick={() => {
                addToCart(item)
                }}>Add to Cart</button><br/><br/>
        </div>
    )
}