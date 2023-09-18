import NewItemForm from "../components/NewItemForm";
import EditMenuList from "../components/EditMenuList";

export default function EditMenu(props) {
  const {menu, setMenu} = props;

  const enableItem = async (itemId) => {
    const sendReq = await fetch(`http://localhost:5050/api/enable-item/${itemId}`);
    const data = await sendReq.json();
    console.log("UPDATED ITEM: ", data)

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
    console.log("UPDATED ITEM: ", data)

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

  return (
    <div>
      <h1>Edit Menu</h1>
      <NewItemForm/><br/>
      <EditMenuList menu={menu} enableItem={enableItem} disableItem={disableItem}/>
    </div>
  );
}
