import { useState, useEffect } from "react";
import services from "../services/blogs";

const Blog = ({
  blog,
  currentUser,
  deleteBlog,
  increaseLikeCount,
  currentLikeCount,
}) => {
  const [viewBlog, setviewBlog] = useState(false);
  // const [currentLikeCount, setCurrentLikeCount] = useState(blog.likes);

  // const increaseOneUpdateServer = async () => {
  //   const newBlogCount = {
  //     title: blog.title,
  //     id: blog.id,
  //     author: blog.author,
  //     url: blog.url,
  //     likes: currentLikeCount + 1,
  //   };

  //   const response = await services.updateLike(newBlogCount);
  //   setCurrentLikeCount(response.likes);
  // };
  // console.log("From Blog", blog.likes);
  const returnLikesCount = async () => {
    increaseLikeCount(blog);
  };

  const returnDeleteBlog = async () => {
    deleteBlog(blog);
  };

  return (
    <div
      style={{
        border: "2px solid black",
        margin: "7px 2px",
        padding: "3px",
      }}
    >
      <div className="blogContainerDiv">
        <p className="blogTitle" style={{ fontWeight: "bold" }}>
          Title: {blog.title}
        </p>
        <p style={{ margin: "0px" }}>Author: {blog.author}</p>
        <div style={{ display: viewBlog ? "" : "none" }}>
          <p style={{ margin: "0px" }}>Url: {blog.url}</p>
          <div>
            Likes: {blog.likes}{" "}
            <button style={{ padding: "1px 5px" }} onClick={returnLikesCount}>
              like
            </button>
          </div>
          {blog.user.username === currentUser.username ? (
            <button
              style={{ backgroundColor: "#cc5050" }}
              onClick={returnDeleteBlog}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>

      <button onClick={(e) => setviewBlog(!viewBlog)}>
        {viewBlog ? "Hide" : "View"}
      </button>
    </div>
  );
};

export default Blog;
