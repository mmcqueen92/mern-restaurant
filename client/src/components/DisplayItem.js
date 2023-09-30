export default function DisplayItem(props) {
  const { item, setEditItem } = props;
  return (
    <div className="display-item">
      <h3 className="display-item-name">{item.name}</h3>
      <p className="display-item-category">Category: {item.category}</p>
      <p className="display-item-description">{item.description}</p>
      <p className="display-item-price">${item.price}</p>
      <p
        className={`display-item-status ${
          item.isActive ? "active" : "inactive"
        }`}
      >
        {item.isActive ? "Active" : "Inactive"}
      </p>
      <button
        className="display-item-edit-button"
        onClick={() => setEditItem(true)}
      >
        Edit Item
      </button>
    </div>
  );
}
