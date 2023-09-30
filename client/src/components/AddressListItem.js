export default function AddressListItem(props) {
  const { address, handleDelete, handleMakeDefault } = props;

  return (
    <div className="user-address-item">
      {address}
      <button
        className="user-address-button"
        onClick={() => handleMakeDefault(address)}
      >
        Set Default
      </button>
      <button
        className="user-address-button"
        onClick={() => handleDelete(address)}
      >
        Delete
      </button>
    </div>
  );
}
