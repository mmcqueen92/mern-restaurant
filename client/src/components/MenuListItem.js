export default function MenuListItem(props) {
    const {name, price, description} = props.item;

    return (
        <div>
            Food name: {name}<br/>
            Food price: {price}<br/>
            Food description: {description}<br/><br/>
        </div>
    )
}