import LoginForm from "../components/LoginForm";

export default function Login(props) {
    const {user, setUser} = props;
    return (
        <div className="login-page">
            {user ? <div>You are already logged in</div> : <LoginForm setUser={setUser}></LoginForm>}
        </div>
    )
}