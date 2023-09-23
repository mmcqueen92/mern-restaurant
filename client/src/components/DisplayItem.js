export default function DisplayItem(props) {
    const {item, setEditItem} = props
    return (
        <div>
            <h3>{item.name}</h3>
            {item.description}<br/>
            {item.category}<br/>
            ${item.price}<br/>
            {item.isActive ? "Active" : "Inactive"}<br/>
            <button onClick={() => setEditItem(true)}>Edit Item</button>
        </div>
    )
}