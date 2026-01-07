import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = window.localStorage.getItem("loggedBlogappUser");
    if (checkUser) {
      setUser(JSON.parse(checkUser));
      blogService.setToken(checkUser.token);
    }
  }, []);

  const loginHandle = async (e) => {
    e.preventDefault();
    const user = await loginService({ username, password });
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    setUser(user);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, [user]);

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
    setUser(null);
  };

  if (user === null) {
    return loginForm();
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={logOut}>Log out</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
