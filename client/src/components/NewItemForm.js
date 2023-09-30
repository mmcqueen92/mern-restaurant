import { useState } from "react";

export default function NewItemForm(props) {
  const { setMenu, setCreateItem } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    const newItem = await fetch("http://localhost:5050/api/create-item", {
      method: "POST",
      body: formData,
    });

    const data = await newItem.json();

    setMenu((prev) => {
      return [...prev, data];
    });
    setName("");
    setDescription("");
    setPrice(0);
    setCategory("");
    setImage(null);
  };

  return (
    <div className="create-new-item-form">
      <h3 className="form-title">New Item Form</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          className="form-input"
          placeholder="Enter item name"
          onChange={handleName}
          value={name}
        />
        <br />
        <input
          type="text"
          className="form-input"
          placeholder="Enter item description"
          onChange={handleDescription}
          value={description}
        />
        <br />
        <input
          type="text"
          className="form-input"
          placeholder="Enter a category"
          onChange={handleCategory}
          value={category}
        />
        <br />
        <input
          type="number"
          className="form-input"
          onChange={handlePrice}
          value={price}
          placeholder="Enter price"
        />
        <br />
        <input
          type="file"
          accept="image/*" // Specify accepted file types (images)
          className="form-input"
          onChange={handleImageUpload}
        />
        <br />
        <button type="submit" className="form-submit-button">
          Create Item
        </button>
        <button 
          className="create-new-item-button"
          onClick={() => {
            setCreateItem(false)
            }}>Cancel</button>
      </form>
    </div>
  );
}
