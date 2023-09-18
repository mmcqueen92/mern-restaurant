import { useState } from "react";

export default function EditMenuForm(props) {
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

    fetch("http://localhost:5050/api/create-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        price,
      }),
    }).then((res) => {
      console.log("create item res: ", res);
    });
  };

  return (
    <div>
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
      <br />
      <br />
      <div>
        <h3>Edit Menu Form</h3>
        {/* list of all items split up by category, with a button to enable/disable */}
      </div>
    </div>
  );
}
