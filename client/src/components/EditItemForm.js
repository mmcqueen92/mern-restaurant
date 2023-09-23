import { useState } from "react";

export default function EditItemForm(props) {
  const { item, setEditItem, menu, setMenu } = props;
  const [newName, setNewName] = useState(item.name);
  const [newDescription, setNewDescription] = useState(item.description);
  const [newCategory, setNewCategory] = useState(item.category);
  const [newPrice, setNewPrice] = useState(item.price);

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleDescription = (e) => {
    setNewDescription(e.target.value);
  };

  const handleCategory = (e) => {
    setNewCategory(e.target.value);
  };

  const handlePrice = (e) => {
    setNewPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedItem = await fetch("http://localhost:5050/api/edit-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item._id,
        name: newName,
        description: newDescription,
        category: newCategory,
        price: newPrice,
      }),
    });

    const data = await editedItem.json();

    const newMenu = menu.map((item) => {
      if (item._id === data._id) {
        return data;
      } else {
        return item;
      }
    })

    setMenu(newMenu)
    setEditItem(false)
  };

  const discardChanges = () => {
    setNewName(item.name);
    setNewDescription(item.description);
    setNewCategory(item.category);
    setNewPrice(item.price);
    setEditItem(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newName} onChange={handleName}></input>
        <br />
        <input
          type="text"
          value={newDescription}
          onChange={handleDescription}
        ></input>
        <br />
        <input
          type="text"
          value={newCategory}
          onChange={handleCategory}
        ></input>
        <br />
        <input type="number" value={newPrice} onChange={handlePrice}></input>
        <br />
        <button type="submit">Save</button>
        <button onClick={discardChanges}>Discard</button>
      </form>
    </div>
  );
}
