import NewItemForm from "../components/NewItemForm";
import EditMenuList from "../components/EditMenuList";

export default function EditMenu(props) {
  const {menu, setMenu} = props;

  const enableItem = async (itemId) => {
    const sendReq = await fetch(`http://localhost:5050/api/enable-item/${itemId}`);
    const data = await sendReq.json();

    const newState = menu.map((item) => {
      if (item._id === data._id) {
        const newItem = {...item, isActive: true}
        return newItem
      } else {
        return item
      }
    })
    setMenu(newState)
  }

  const disableItem = async (itemId) => {
    const sendReq = await fetch(`http://localhost:5050/api/disable-item/${itemId}`);
    const data = await sendReq.json();

    const newState = menu.map((item) => {
      if (item._id === data._id) {
        const newItem = {...item, isActive: false}
        return newItem
      } else {
        return item
      }
    })
    setMenu(newState)
  }

  const deleteItem = async (itemId) => {
    await fetch(`http://localhost:5050/api/delete-item`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId
      })
    })
    const newMenu = menu.filter((item) => item._id !== itemId);
    setMenu(newMenu);
  }

  return (
    <div>
      <h1>Edit Menu</h1>
      <NewItemForm setMenu={setMenu}/><br/>
      <EditMenuList menu={menu} enableItem={enableItem} disableItem={disableItem} deleteItem={deleteItem}/>
    </div>
  );
}
