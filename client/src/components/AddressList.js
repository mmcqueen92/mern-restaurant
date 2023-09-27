import AddressListItem from "./AddressListItem";
import NewAddressForm from "./NewAddressForm";

export default function AddressList(props) {
  const { user, setUser, addresses, handleDelete } = props;

  const addressList = addresses.map((address, i) => {
    return <AddressListItem address={address} key={i} handleDelete={handleDelete}/>;
  });
  return (
    <div>
      <h3>Addresses:</h3>
      {addressList}
      <NewAddressForm user={user} setUser={setUser}/>
    </div>
  );
}
