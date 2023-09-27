import { useEffect, useState } from "react";
import AddressList from "../components/AddressList";
import UserOrderList from "../components/UserOrderList";

export default function UserProfile(props) {
  const { user, setUser } = props;
  const [userOrders, setUserOrders] = useState([])

  const fetchUserOrders = async (userId) => {
    const response = await fetch(`http://localhost:5050/api/user-orders/${userId}`, {
      mode: "cors",
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    // fetch user orders
    fetchUserOrders(user._id).then((res) => setUserOrders(res))
  }, [user])

  // for testing purposes
  useEffect(() => {
    console.log("USER ORDERS: ", userOrders)
  }, [userOrders])

  const handleDelete = async (addressToDelete) => {
    const newAddresses = user.addresses.filter(
      (address) => address !== addressToDelete
    );

    fetch("http://localhost:5050/api/delete-address", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        newAddresses,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setUser((prev) => {
          return { ...prev, addresses: res };
        });
      });
  };

  const handleMakeDefault = async (newDefaultAddress) => {
    fetch("http://localhost:5050/api/add-default-address", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          newDefaultAddress
        }),
    })
    .then((res) => res.json())
    .then((res) => {
        setUser((prev) => {
            return {...prev, defaultAddress: res}
        })
    })
  }

  return (
    <div>
      <h3>User Profile</h3>
      <p>Email: {user.email}</p>
      <p>Default Address: {user.defaultAddress}</p>
      <AddressList user={user} setUser={setUser} addresses={user.addresses} handleDelete={handleDelete} handleMakeDefault={handleMakeDefault}/>
      <UserOrderList orderIds={userOrders}/>
    </div>
  );
}
