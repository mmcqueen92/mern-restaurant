export default function EditMenuListItem(props) {
    const { item, enableItem, disableItem } = props;
    console.log("ITEM: ", item)
    return (
        <div>
            <h5>EditMenuListItem</h5>
            {item.name}<br/>
            {item.description}<br/>
            ${item.price}<br/>
            {item.isActive ? "Active" : "Inactive"}<br/>
            <button onClick={() => {enableItem(item._id)}}>Enable</button>
            <button onClick={() => {disableItem(item._id)}}>Disable</button>
        </div>
    )
}