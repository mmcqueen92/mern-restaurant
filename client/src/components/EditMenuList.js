import EditMenuListItem from "./EditMenuListItem";

export default function EditMenuList(props) {
  const { menu, enableItem, disableItem, deleteItem, setMenu } = props;
  const editMenuListItems = menu.map((item, i) => {
    return <EditMenuListItem item={item} key={i} enableItem={enableItem} disableItem={disableItem} deleteItem={deleteItem} menu={menu} setMenu={setMenu}></EditMenuListItem>;
  });
  return (
    <div>
      <h3>Edit Menu List</h3>
      {editMenuListItems}
    </div>
  );
}
