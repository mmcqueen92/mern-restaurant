import { useState } from "react";

export default function EditItemForm(props) {
  const { item, setEditItem, menu, setMenu } = props;
  const [newName, setNewName] = useState(item.name);
  const [newDescription, setNewDescription] = useState(item.description);
  const [newCategory, setNewCategory] = useState(item.category);
  const [newPrice, setNewPrice] = useState(item.price);
  const [newImage, setNewImage] = useState(null);

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

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setNewImage(imageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append the item details to the FormData object
    formData.append("id", item._id);
    formData.append("name", newName);
    formData.append("description", newDescription);
    formData.append("category", newCategory);
    formData.append("price", newPrice);

    // Append the edited image file to the FormData object
    if (newImage) {
      formData.append("image", newImage);
    }

    const editedItem = await fetch("http://localhost:5050/api/edit-item", {
      method: "POST",
      body: formData, // Use the FormData object as the request body
    });

    const data = await editedItem.json();

    const newMenu = menu.map((menuItem) => {
      if (menuItem._id === data._id) {
        return data;
      } else {
        return menuItem;
      }
    });

    setMenu(newMenu);
    setEditItem(false);

    // Clear form fields and selected image after submission
    setNewName("");
    setNewDescription("");
    setNewCategory("");
    setNewPrice("");
    setNewImage(null);
  };

  const discardChanges = () => {
    setNewName(item.name);
    setNewDescription(item.description);
    setNewCategory(item.category);
    setNewPrice(item.price);
    setEditItem(false);
  };

  return (
    <div className="edit-item-form">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          className="edit-item-section"
          value={newName}
          onChange={handleName}
          placeholder="Enter item name"
        ></input>
        <br />
        <input
          type="text"
          className="edit-item-section"
          value={newDescription}
          onChange={handleDescription}
          placeholder="Enter item description"
        ></input>
        <br />
        <input
          type="text"
          className="edit-item-section"
          value={newCategory}
          onChange={handleCategory}
          placeholder="Enter category"
        ></input>
        <br />
        <input
          type="number"
          className="edit-item-section"
          value={newPrice}
          onChange={handlePrice}
          placeholder="Enter price"
        ></input>
        <br />
        <input
          type="file"
          accept="image/*" // Specify accepted file types (images)
          className="edit-item-image"
          onChange={handleImageUpload}
        ></input>
        <br />
        <button type="submit" className="edit-item-save-button">
          Save
        </button>
        <button className="edit-item-discard-button" onClick={discardChanges}>
          Discard
        </button>
      </form>
    </div>
  );
}
