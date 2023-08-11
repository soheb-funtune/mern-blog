import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { MyContext } from "../state/blog-context";
const LoginPage = () => {
  const { state, dispatch } = useContext(MyContext);
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:2000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setRedirect(data?.token);
        localStorage.setItem("token", data?.token);
        dispatch({ type: "token", payload: data?.token });
        dispatch({ type: "userId", payload: data?.userId });
        console.log(data);
      } else {
        alert("wrong Credetials");
      }
    } catch (e) {
      alert("Failed to Login");
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="User Name"
      />
      <input
        type="password"
        onChange={(e) => setpassword(e.target.value)}
        value={password}
        placeholder="Password"
      />
      <button type={"submit"}>Login</button>
    </form>
  );
};

export default LoginPage;
