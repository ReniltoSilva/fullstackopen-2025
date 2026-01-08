import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const checkUser = JSON.parse(
      window.localStorage.getItem("loggedBlogappUser")
    );
    if (checkUser) {
      setUser(checkUser);
      setUsername("");
      setPassword("");
      blogService.setToken(checkUser.token);
    }
  }, []);

  useEffect(() => {
    if (user === null) {
      return;
    }
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, [user]);

  const loginHandle = async (e) => {
    console.log(9);
    e.preventDefault();
    const user = await loginService({ username, password });
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    setUser(user);
  };

  const loginForm = () => {
    return (
      <form onSubmit={loginHandle}>
        <div>
          <label>
            username:
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
          </label>

          <label>
            password:
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    );
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setBlogs([]);
    setUser(null);
  };

  const createBlog = async (e) => {
    e.preventDefault();

    const response = await blogService.create({ title, author, url });
    const newBlogs = blogs.concat(response);
    setBlogs(newBlogs);
  };

  if (user === null) {
    return loginForm();
  }

  return (
    <div>
      <h2>Blogs</h2>
      <div className="userNameContainer">
        <p>{user.name} logged in</p>
        <button onClick={logOut} className="loginBtn">
          Log out
        </button>
      </div>

      <form onSubmit={createBlog}>
        <div className="blogInputContainer">
          <label>
            Title:
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
          </label>

          <label>
            Author:
            <input type="text" onChange={(e) => setAuthor(e.target.value)} />
          </label>

          <label>
            Url:
            <input type="text" onChange={(e) => setUrl(e.target.value)} />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
