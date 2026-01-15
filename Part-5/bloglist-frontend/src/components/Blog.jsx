import { useState } from "react";

const Blog = ({ blog }) => {
  const [viewBlog, setviewBlog] = useState(false);

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
        <p style={{ margin: "0px" }}>{blog.likes}</p>
      </div>
      <button onClick={(e) => setviewBlog(!viewBlog)}>
        {viewBlog ? "Hide" : "View"}
      </button>
    </div>
  );
};

export default Blog;
