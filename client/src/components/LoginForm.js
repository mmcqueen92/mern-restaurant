import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm(props) {
  const { setUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginAttempt = await fetch("http://localhost:5050/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    }).catch((e) => {
      alert("ERROR: ", e);
    });
    const data = await loginAttempt.json();

    if (data.status === "ok") {
      setUser(data.user);
      setEmail("");
      setPassword("");
      localStorage.setItem("jwt_token", JSON.stringify(data.token));
      localStorage.setItem("mern_restaurant_user", JSON.stringify(data.user));
      navigate("/");
    } else {
        alert("Email or password does not match")
    }
  };

  return (
    <div>
      <form id="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={handleEmail}
          value={email}
        ></input>

        <input
          type="password"
          placeholder="Enter your password"
          onChange={handlePassword}
          value={password}
        ></input>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
