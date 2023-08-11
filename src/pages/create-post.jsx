import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const modules = {
    toolbar: [
      // Specify the desired toolbar options here
      ["bold", "italic", "underline", "strike"], // Basic formatting options
      ["link", "image"], // Additional options: link and image
      [{ list: "ordered" }, { list: "bullet" }], // Lists
    ],
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("file", files);
    data.set("content", content);
    e.preventDefault();
    const res = await fetch("http://localhost:2000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (res.ok) {
      setRedirect(true);
    }
    console.log({ files });
  };

  return redirect ? (
    <Navigate to={"/"} />
  ) : (
    <form onSubmit={handelSubmit}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
      {files && <img src={URL.createObjectURL(files)} alt="alt" />}
      <ReactQuill
        value={content}
        onChange={setContent}
        formats={formats}
        modules={modules}
      />
      <button style={{ marginTop: "10px" }}>Create Post</button>
    </form>
  );
};

export default CreatePost;
