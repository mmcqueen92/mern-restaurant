import AddressListItem from "./AddressListItem";
import NewAddressForm from "./NewAddressForm";

export default function AddressList(props) {
  const { user, setUser } = props;

  const addressList = user.addresses.map((address, i) => {
    return <AddressListItem address={address} key={i} user={user}/>;
  });
  return (
    <div>
      <h3>Addresses:</h3>
      {addressList}
      <NewAddressForm user={user} setUser={setUser}/>
    </div>
  );
}
