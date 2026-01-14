import { useState } from "react";

const BlogForm = ({ handleChange }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = (e) => {
    e.preventDefault();
    handleChange({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <div className="blogInputContainer">
        <form onSubmit={createBlog}>
          <label>
            Title:
            <input
              type="text"
              value={
                title
              } /* This is to empty input field after form is submitted */
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Author:
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>

          <label>
            Url:
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
