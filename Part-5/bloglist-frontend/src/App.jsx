import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Toggable from "./components/Toggable";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [messageAlert, setMessageAlert] = useState(null);

  const blogFormRef = useRef();

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
    e.preventDefault();

    try {
      const user = await loginService({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        setMessageAlert({
          message: `${error.response.data.error || "Login failed"}`,
          class: "errorAlertClass",
        });
        hideNotification();
      } else if (error.request) {
        setMessageAlert({
          message: "No response from server",
          class: "errorAlertClass",
        });
        hideNotification();
      } else {
        setMessageAlert({
          message: "An error occured",
          class: "errorAlertClass",
        });
        hideNotification();
      }
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={loginHandle}>
        {messageAlert === null ? "" : <Notification message={messageAlert} />}
        <div>
          <label>
            Username:
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
          </label>

          <label>
            Password:
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
    setUsername("");
    setPassword("");
  };

  const hideNotification = () => {
    setTimeout(() => {
      setMessageAlert(null);
    }, 3000);
  };

  const createBlog = async ({ author, title, url }) => {
    blogFormRef.current.toggleVisibility();
    // const response = await blogService.create({ title, author, url });
    const response = await blogService.create({ author, title, url });

    if (response.status === 201) {
      const newBlogs = blogs.concat(response.data);
      setBlogs(newBlogs);
      setMessageAlert({
        message: `Blog ${response.data.title} by ${response.data.author} was successfully created!`,
        class: "successAlertClass",
      });

      hideNotification();
    } else if (response.error) {
      setMessageAlert({
        message: response.error,
        class: "errorAlertClass",
      });
      hideNotification();
    }
  };

  if (user === null) {
    return loginForm();
  }

  return (
    <div>
      <h2>Blogs</h2>
      {messageAlert === null ? "" : <Notification message={messageAlert} />}

      <div className="userNameContainer">
        <p>{user.name} logged in</p>
        <button onClick={logOut} className="loginBtn">
          Log out
        </button>
      </div>

      <Toggable ref={blogFormRef}>
        <BlogForm handleChange={createBlog} />
      </Toggable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
