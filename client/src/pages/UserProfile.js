import AddressList from "../components/AddressList";

export default function UserProfile(props) {
  const { user, setUser } = props;

  return (
    <div>
      <h3>User Profile</h3>
      <p>Email: {user.email}</p>
      <AddressList user={user} setUser={setUser}/>
    </div>
  );
}
