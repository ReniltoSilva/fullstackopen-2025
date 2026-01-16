import { useState, useEffect } from "react";
import services from "../services/blogs";
import blogs from "../services/blogs";

const Blog = ({ blog }) => {
  const [viewBlog, setviewBlog] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(blog.likes);

  const increaseyOneUpdateServer = async () => {
    const newBlogCount = {
      title: blog.title,
      id: blog.id,
      author: blog.author,
      url: blog.url,
      likes: currentLikeCount + 1,
    };

    const response = await services.updateLike(newBlogCount);
    setCurrentLikeCount(response.likes);
  };

  return (
    <div
      style={{
        border: "2px solid black",
        margin: "7px 2px",
        padding: "3px",
      }}
    >
      <p style={{ fontWeight: "bold" }}>{blog.title}</p>
      <div style={{ display: viewBlog ? "" : "none" }}>
        <p style={{ margin: "0px" }}>{blog.author}</p>
        <p style={{ margin: "0px" }}>{blog.url}</p>
        <div>
          {currentLikeCount}{" "}
          <button
            style={{ padding: "1px 5px" }}
            onClick={increaseyOneUpdateServer}
          >
            like
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
