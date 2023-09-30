import { useState } from "react";

export default function NewAddressForm(props) {
  const [newAddress, setNewAddress] = useState("");
  const { user, setUser } = props;

  const handleNewAddress = (e) => {
    setNewAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5050/api/add-new-address", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        newAddress: newAddress,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setUser((prev) => {
          return { ...prev, addresses: res };
        });
        setNewAddress("");
      });
  };

  return (
    <form className="user-address-form" onSubmit={handleSubmit}>
      <label htmlFor="new-address-input" className="user-address-label">
        Add New Address
      </label>
      <input
        type="text"
        value={newAddress}
        onChange={handleNewAddress}
        id="new-address-input"
        className="user-address-input"
      ></input>
      <button type="submit" className="user-address-button">
        Add
      </button>
    </form>
  );
}
