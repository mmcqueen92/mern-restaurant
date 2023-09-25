import LoginForm from "../components/LoginForm";

export default function Login(props) {
    const {setUser} = props;
    return (
        <div>
            <h3>Login Page</h3>
            <LoginForm setUser={setUser}></LoginForm>
        </div>
    )
}