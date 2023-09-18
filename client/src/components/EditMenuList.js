import EditMenuListItem from "./EditMenuListItem";

export default function EditMenuList(props) {
  const { menu, enableItem, disableItem } = props;
  const editMenuListItems = menu.map((item, i) => {
    return <EditMenuListItem item={item} key={i} enableItem={enableItem} disableItem={disableItem}></EditMenuListItem>;
  });
  return (
    <div>
      <h3>Edit Menu List</h3>
      {editMenuListItems}
    </div>
  );
}
