import CreateNewUserForm from "../components/CreateNewUserForm";

export default function CreateNewUser({ user }) {
  return (
    <div>
      {user ? (
        <div>Please log out before creating a new account</div>
      ) : (
        <div>
          <h3>Create New User Page</h3>
          <CreateNewUserForm></CreateNewUserForm>
        </div>
      )}
    </div>
  );
}
