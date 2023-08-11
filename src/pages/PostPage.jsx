import { formatISO9075, format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MyContext } from "../state/blog-context";
const PostPage = () => {
  const { state } = useContext(MyContext);
  const [post, setPost] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:2000/post/${id}`)
      .then((res) => res.json())
      .then((res) => setPost(res));
  }, []);
  return (
    <div className="post-page">
      <h1>{post?.title}</h1>
      {/* <time>{format(new Date(post?.createdAt), "MMM d, yyyy HH:mm")}</time> */}
      <div className="author">By {post?.author?.username}</div>
      <Link to={`/edit/${post?._id}`}>
        {state?.userId === post?.author?._id ? (
          <button className="btn">Edit Post</button>
        ) : (
          <noscript />
        )}
      </Link>
      <div className="image">
        <img src={`http://localhost:2000/${post.cover}`} />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
    </div>
  );
};

export default PostPage;
