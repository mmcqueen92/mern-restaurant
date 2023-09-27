export default function AddressListItem(props) {
  const { address } = props;

  return (
    <div>
      {address}
      <button>Set Default</button>
      <button>Delete</button>
    </div>
  );
}
