import NewItemForm from "../components/NewItemForm";
import EditMenuList from "../components/EditMenuList";

export default function EditMenu(props) {
  const {menu} = props;
  return (
    <div>
      <h1>Edit Menu</h1>
      <NewItemForm/><br/>
      <EditMenuList menu={menu}/>
    </div>
  );
}
