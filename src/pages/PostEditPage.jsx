import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";

const PostEditPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [cover, setCover] = useState("");
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

  useEffect(() => {
    fetch(`http://localhost:2000/post/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setTitle(result?.title);
        setSummary(result?.summary);
        setContent(result?.content);
        setCover(result?.cover);
        console.log({ id, result });
      });
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      files && data.set("file", files);
      await fetch(`http://localhost:2000/post/${id}`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });
      //   if (res.ok) {
      //     setRedirect(true);
      //   }
      //   console.log({ files });
    } catch (err) {
      console.log({ err });
    }
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
        // defaultValue={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
      {files ? (
        <img src={URL.createObjectURL(files)} alt="alt" />
      ) : (
        <img src={`http://localhost:2000/${cover}`} alt="alt" />
      )}
      <ReactQuill
        value={content}
        onChange={setContent}
        formats={formats}
        modules={modules}
      />
      <button type="submit" style={{ marginTop: "10px" }}>
        Create Post
      </button>
    </form>
  );
};

export default PostEditPage;
