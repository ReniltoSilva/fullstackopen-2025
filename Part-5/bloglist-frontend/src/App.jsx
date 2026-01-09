import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
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

  const [messageAlert, setMessageAlert] = useState(null);

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
      if (user) {
        console.log(user.error, "response from App in frontend");
      }
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessageAlert({
        message: `${error.response.data.error}`,
        class: "errorAlertClass",
      });
      showNotification();
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

  // useEffect(() => {
  //   if (user == null) {
  //     return;
  //   }

  //   setTimeout(() => {
  //     //CONTINUE  criar um component para mostrar mensagem?
  //   }, 2000);
  // }, [blogs]);

  const showNotification = () => {
    setTimeout(() => {
      setMessageAlert(null);
    }, 3000);
  };

  const createBlog = async (e) => {
    e.preventDefault();

    const response = await blogService.create({ title, author, url });
    if (response.status === 201) {
      const newBlogs = blogs.concat(response.data);
      setBlogs(newBlogs);
      // setSuccessAlert("Blog  created");
      setMessageAlert({
        message: `Blog ${response.data.title} by ${response.data.author} was successfully created!`,
        class: "successAlertClass",
      });
      showNotification();
    } else if (response.error) {
      // setErrorAlert("Blog not created");
      setMessageAlert({
        message: "Error: Blog not created",
        class: "errorAlertClass",
      });
      showNotification();
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
