import AddressList from "../components/AddressList";

export default function UserProfile(props) {
  const { user, setUser } = props;

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

  return (
    <div>
      <h3>User Profile</h3>
      <p>Email: {user.email}</p>
      <AddressList user={user} setUser={setUser} addresses={user.addresses} handleDelete={handleDelete}/>
    </div>
  );
}
