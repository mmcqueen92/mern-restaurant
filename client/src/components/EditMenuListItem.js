import { useState } from "react";
import EditItemForm from "./EditItemForm";
import DisplayItem from "./DisplayItem";

export default function EditMenuListItem(props) {
  const { item, enableItem, disableItem, deleteItem, menu, setMenu } = props;
  const [editItem, setEditItem] = useState(false);

  return (
    <div className="edit-menu-list-item">
      {editItem ? (
        <EditItemForm
          item={item}
          setEditItem={setEditItem}
          menu={menu}
          setMenu={setMenu}
        ></EditItemForm>
      ) : (
        <DisplayItem item={item} setEditItem={setEditItem}></DisplayItem>
      )}
      <div className="edit-menu-button-container">
        <button
          className="enable-item-button"
          onClick={() => {
            enableItem(item._id);
          }}
        >
          Enable
        </button>
        <button
          className="disable-item-button"
          onClick={() => {
            disableItem(item._id);
          }}
        >
          Disable
        </button>
        <button
          onClick={() => {
            deleteItem(item._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
