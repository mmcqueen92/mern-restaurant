import NewItemForm from "../components/NewItemForm";
import EditMenuList from "../components/EditMenuList";

export default function EditMenu(props) {
  const {menu} = props;

  const enableItem = async (itemId) => {
    const sendReq = await fetch(`http://localhost:5050/api/enable-item/${itemId}`);
    const data = await sendReq.json();
    return data;
  }

  const disableItem = async (itemId) => {
    const sendReq = await fetch(`http://localhost:5050/api/disable-item/${itemId}`);
    const data = await sendReq.json();
    return data;
  }

  return (
    <div>
      <h1>Edit Menu</h1>
      <NewItemForm/><br/>
      <EditMenuList menu={menu} enableItem={enableItem} disableItem={disableItem}/>
    </div>
  );
}
