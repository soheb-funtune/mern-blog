import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../state/blog-context";

const Header = () => {
  const { state, dispatch } = useContext(MyContext);

  console.log({ state });

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "token", payload: false });
    dispatch({ type: "userId", payload: false });
    document.getElementById("logo") &&
      document.getElementById("logo").onclick();
  };

  return (
    <header>
      <Link id="logo" className="logo" to={"/"}>
        MyBlog
      </Link>
      <nav>
        {state?.token ? (
          <>
            <Link to={"/create"}>Create</Link>
            <a style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
              Logout
            </a>
          </>
        ) : (
          <>
            {" "}
            <Link to={"/"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
