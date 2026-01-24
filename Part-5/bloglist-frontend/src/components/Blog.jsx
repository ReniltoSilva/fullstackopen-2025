import { useState, useEffect } from "react";
import services from "../services/blogs";

const Blog = ({ blog, deleteBlog }) => {
  const [viewBlog, setviewBlog] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(blog.likes);

  const increaseOneUpdateServer = async () => {
    const newBlogCount = {
      title: blog.title,
      id: blog.id,
      author: blog.author,
      url: blog.url,
      likes: currentLikeCount + 1,
    };

    /* Should I also add the backend logic 
    in 'increaseyOneUpdateServer' to the App component as well or leave it here? */
    const response = await services.updateLike(newBlogCount);
    setCurrentLikeCount(response.likes);
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
        <p style={{ fontWeight: "bold" }}>Title: {blog.title}</p>
        <div style={{ display: viewBlog ? "" : "none" }}>
          <p style={{ margin: "0px" }}>Url: {blog.url}</p>
          <p style={{ margin: "0px" }}>Author: {blog.author}</p>
          <div>
            Likes: {currentLikeCount}{" "}
            <button
              style={{ padding: "1px 5px" }}
              onClick={increaseOneUpdateServer}
            >
              like
            </button>
          </div>
          <button
            style={{ backgroundColor: "#cc5050" }}
            onClick={returnDeleteBlog}
          >
            Delete
          </button>
        </div>
      </div>

      <button onClick={(e) => setviewBlog(!viewBlog)}>
        {viewBlog ? "Hide" : "View"}
      </button>
    </div>
  );
};

export default Blog;
