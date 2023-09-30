import NewItemForm from "../components/NewItemForm";
import EditMenuList from "../components/EditMenuList";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditMenu(props) {
  const { menu, setMenu, user } = props;
  const navigate = useNavigate();
  const [createItem, setCreateItem] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, []);

  const enableItem = async (itemId) => {
    const sendReq = await fetch(
      `http://localhost:5050/api/enable-item/${itemId}`,
      { mode: "cors" }
    );
    const data = await sendReq.json();

    const newState = menu.map((item) => {
      if (item._id === data._id) {
        const newItem = { ...item, isActive: true };
        return newItem;
      } else {
        return item;
      }
    });
    setMenu(newState);
  };

  const disableItem = async (itemId) => {
    const sendReq = await fetch(
      `http://localhost:5050/api/disable-item/${itemId}`,
      { mode: "cors" }
    );
    const data = await sendReq.json();

    const newState = menu.map((item) => {
      if (item._id === data._id) {
        const newItem = { ...item, isActive: false };
        return newItem;
      } else {
        return item;
      }
    });
    setMenu(newState);
  };

  const deleteItem = async (itemId) => {
    await fetch(`http://localhost:5050/api/delete-item`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId,
      }),
    });
    const newMenu = menu.filter((item) => item._id !== itemId);
    setMenu(newMenu);
  };

  return (
    <div>
      <h1 className="edit-menu-page-header">Edit Menu</h1>
      {createItem ? (
        <div className="new-item-form-container">
          <NewItemForm setMenu={setMenu} setCreateItem={setCreateItem}/>
          
        </div>
      ) : (
        <button className="create-new-item-button" onClick={() => setCreateItem(true)}>Create New Item</button>
      )}
      <br />
      <EditMenuList
        menu={menu}
        setMenu={setMenu}
        enableItem={enableItem}
        disableItem={disableItem}
        deleteItem={deleteItem}
      />
    </div>
  );
}
