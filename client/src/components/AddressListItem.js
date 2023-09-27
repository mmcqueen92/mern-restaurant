export default function AddressListItem(props) {
  const { address, handleDelete } = props;

  return (
    <div>
      {address}
      <button>Set Default</button>
      <button onClick={() => handleDelete(address)}>Delete</button>
    </div>
  );
}
