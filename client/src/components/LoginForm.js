import { useState } from "react";

export default function LoginForm(props) {
  const { setUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    });

    const data = await loginAttempt.json();

    if (data.status === "ok") {
      setUser(data.user);
      setEmail("");
      setPassword("");
      localStorage.setItem("jwt_token", JSON.stringify(data.token));
      localStorage.setItem("mern_restaurant_user", JSON.stringify(data.user));
    }
  };

  return (
    <div>
      <h3>Login Form</h3>
      <form id="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={handleEmail}
          value={email}
        ></input>

        <input
          type="text"
          placeholder="Enter your password"
          onChange={handlePassword}
          value={password}
        ></input>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
