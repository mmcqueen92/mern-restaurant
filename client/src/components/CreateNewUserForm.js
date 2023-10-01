import { useState } from "react";

export default function CreateNewUserForm() {
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

    if (!email || !password) {
        alert("Email and Password are required")
    } else {
        const newUser = await fetch("http://localhost:5050/api/create-new-user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await newUser.json();

        if (data.status === "ok") {
            setEmail("");
            setPassword("")
            localStorage.setItem("jwt_token", JSON.stringify(data.token))
            localStorage.setItem("mern_restaurant_user", JSON.stringify(data.user))
        }
    }

  };

  return (
    <div className="login-form-container">
      <h1 className="login-header">Register</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={handleEmail}
          value={email}
          className="login-input"
        ></input>

        <input
          type="password"
          placeholder="Enter your password"
          onChange={handlePassword}
          value={password}
          className="login-input"
        ></input>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}
