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
            console.log("User created successfully: ", data.user)
            setEmail("");
            setPassword("")
            localStorage.setItem("jwt_token", JSON.stringify(data.token))
            localStorage.setItem("mern_restaurant_user", JSON.stringify(data.user))
        }
    }

  };

  return (
    <div>
      <form id="new-user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter email"
          onChange={handleEmail}
          value={email}
        ></input>

        <input
          type="password"
          placeholder="Enter a password"
          onChange={handlePassword}
          value={password}
        ></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
