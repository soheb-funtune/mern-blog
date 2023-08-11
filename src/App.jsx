import { useContext, useEffect, useState } from "react";
import "./App.css";
import Post from "./components/post";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { MyContext } from "./state/blog-context";
import CreatePost from "./pages/create-post";
import PostPage from "./pages/PostPage";
import PostEditPage from "./pages/PostEditPage";

function App() {
  const { state } = useContext(MyContext);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {state?.token ? (
          <>
            <Route index element={<IndexPage />} />
            <Route exact path="/create" element={<CreatePost />} />
            <Route exact path="/post/:id" element={<PostPage />} />
            <Route exact path="/edit/:id" element={<PostEditPage />} />
            <Route path="/*" element={<h1>Error Page</h1>} />
          </>
        ) : (
          <>
            <Route exact index element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<h1>Error Page</h1>} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;
