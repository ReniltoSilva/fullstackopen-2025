import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import Toggable from "./components/Toggable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

/* Components can also be declared like this -
const App = () => {...} like writing a function */
function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [messageAlert, setMessageAlert] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const checkUser = JSON.parse(
      window.localStorage.getItem("loggedBlogappUser"),
    );
    if (checkUser) {
      setUser(checkUser);
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

  const loginHandle = async (credentials) => {
    try {
      const user = await loginService(credentials);
      /* The test to create notes in Playwright works because we are not storing
      the token in localStorage, in the blogs project we are saving it to LS.
      The notes project work because we send the create note request 
      along with the token everytime */
      console.log(user, "USER FROM FRONTEND");
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
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
      <Toggable btnName={"Login"}>
        {messageAlert === null ? "" : <Notification message={messageAlert} />}
        <LoginForm loginHandle={loginHandle} />
      </Toggable>
    );
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setBlogs([]);
    setUser(null);
  };

  const hideNotification = () => {
    setTimeout(() => {
      setMessageAlert(null);
    }, 3000);
  };

  const createBlog = async ({ author, title, url }) => {
    blogFormRef.current.toggleVisibility();
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

  const deleteBlog = async (blog) => {
    if (confirm(`Delete ${blog.title}?`)) {
      const response = await blogService.deleteBlog(blog.id);

      if (response.status === 204) {
        setBlogs(blogs.filter((b) => blog.id !== b.id));
        setMessageAlert({
          message: `${blog.title} deleted successfully!`,
          class: "successAlertClass",
        });
        hideNotification();
      } else {
        alert("An error occurred!");
        setMessageAlert({
          message: `An error occurred`,
          class: "errorAlertClass",
        });
        hideNotification();
      }
    }
  };

  const increaseLikeCount = async (blog) => {
    const newBlogCount = {
      title: blog.title,
      id: blog.id,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };

    const response = await blogService.updateLike(newBlogCount);

    // const blogToReplace = blogs.find((item) => item.id === response.id);
    // blogToReplace.likes = response.likes;

    // const newBlogsArr = blogs.map((item) => {
    //   if (item.id === blogToReplace.id) {
    //     return blogToReplace;
    //   } else {
    //     return item;
    //   }
    // });

    const newBlogsArr = blogs.map((b) =>
      b.id !== blog.id ? b : { ...b, likes: response.likes },
    ); /* I want to understand this -> { ...b, likes: response.likes } */

    setBlogs(newBlogsArr);
  };

  if (user === null) {
    return loginForm();
  }

  return (
    <div>
      {messageAlert === null ? "" : <Notification message={messageAlert} />}
      <h2>Blogs</h2>

      <div className="userNameContainer">
        <p>Welcome, {user.name}!</p>
        <button onClick={logOut} className="loginBtn">
          Log out
        </button>
      </div>

      <Toggable ref={blogFormRef} btnName={"New blog"}>
        <BlogForm handleChange={createBlog} />
      </Toggable>

      {blogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            deleteBlog={deleteBlog}
            increaseLikeCount={increaseLikeCount}
          />
        ))
        .sort((a, b) => a.props.blog.likes - b.props.blog.likes)}
    </div>
  );
}

export default App;
