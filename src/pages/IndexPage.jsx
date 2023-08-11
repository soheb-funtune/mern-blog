import React, { useState, useEffect } from "react";
import Post from "../components/post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:2000/post");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const resPost = await res.json();
        setPosts(resPost);
        console.log(resPost);
      } catch (err) {
        console.log("GET-POST", err);
      }
    };

    fetchPosts();
  }, []);

  console.log({ posts });
  return posts.length > 0 ? (
    posts?.map((item) => <Post key={item._id} item={item} />)
  ) : (
    <noscript />
  );
};

export default IndexPage;
