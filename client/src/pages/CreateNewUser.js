import CreateNewUserForm from "../components/CreateNewUserForm";

export default function CreateNewUser({ user }) {
  return (
    <div className="login-page">
      {user ? (
        <div>Please log out before creating a new account</div>
      ) : (
        <div>
          <CreateNewUserForm></CreateNewUserForm>
        </div>
      )}
    </div>
  );
}
