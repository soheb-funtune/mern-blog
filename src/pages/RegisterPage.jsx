import React, { useState } from "react";
import { RegisterAPI } from "../state/services";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    console.log("register submit", username, password);
    RegisterAPI({ username, password });
  };
  return (
    <form onSubmit={register} className="register">
      <h1>Register</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="User Name"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
