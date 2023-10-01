import React, { useState } from "react";

export default function ReservationForm(props) {
  const {
    timeSlot,
    onClose,
    setShowReservationMessage,
    setReservationMessage,
  } = props;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    numberOfPeople: 1, // Default value
    timeSlot: timeSlot,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add validation logic here if needed
    // For example, checking if the number of people is valid
    // Create a new reservation object
    const reservation = {
      name: formData.name,
      phone: formData.phone,
      numberOfPeople: parseInt(formData.numberOfPeople),
      timeSlotId: timeSlot._id, // Change to match the server-side expectation
    };

    // Send a POST request to create the reservation
    fetch("http://localhost:5050/reservations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    })
      .then(async (response) => {
        if (response.ok) {
          // Reservation created successfully
          // You can perform additional actions here (e.g., show a success message)
          console.log("Reservation created successfully");
          setReservationMessage("Reservation created successfully");
          setShowReservationMessage(true);
        } else {
          // Handle errors (e.g., display an error message)
          const responseData = await response.json();
          console.error("Error creating reservation:", responseData);
        }
      })
      .catch((error) => {
        console.error(
          "Error creating reservation:",
          error

        );
      });

    // Close the form
    onClose();
  };

  return (
    <div className="reservation-form">
      <h3>Create Reservation</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfPeople">Number of People:</label>
          <input
            type="number"
            id="numberOfPeople"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleInputChange}
            required
            min="1" // Minimum value for the number of people
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
