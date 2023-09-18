export default function EditMenuListItem(props) {
    const {item} = props;
    console.log("ITEM: ", item)
    return (
        <div>
            <h5>EditMenuListItem</h5>
            {item.name}<br/>
            {item.description}<br/>
            ${item.price}<br/>
            {item.isActive ? "Active" : "Inactive"}<br/>
        </div>
    )
}