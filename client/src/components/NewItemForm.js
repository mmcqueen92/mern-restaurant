import { useState } from "react";

export default function NewItemForm(props) {
  const {setMenu} = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = await fetch("http://localhost:5050/api/create-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        price,
      }),
    })

    const data = await newItem.json();

    setMenu((prev) => {return [...prev, data]})
  };

  return (
    <div>
      <h3>New Item Form</h3>
      <form id="new-item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter item name"
          onChange={handleName}
          value={name}
        ></input>

        <input
          type="text"
          placeholder="Enter item description"
          onChange={handleDescription}
          value={description}
        ></input>

        <input type="number" onChange={handlePrice} value={price}></input>

        <button type="submit">Create Item</button>
      </form>
    </div>
  );
}
