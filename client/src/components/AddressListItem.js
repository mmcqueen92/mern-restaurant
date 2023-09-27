export default function AddressListItem(props) {
  const { address, handleDelete, handleMakeDefault } = props;

  return (
    <div>
      {address}
      <button onClick={() => handleMakeDefault(address)}>Set Default</button>
      <button onClick={() => handleDelete(address)}>Delete</button>
    </div>
  );
}
