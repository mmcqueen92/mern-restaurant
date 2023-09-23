import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    console.log("LOGIN HANDLESUBMIT");
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
      </form>
    </div>
  );
}
