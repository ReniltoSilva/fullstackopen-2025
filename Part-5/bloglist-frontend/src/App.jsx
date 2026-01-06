import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState(""); //Why not use null? why use ''?
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const loginHandle = async (e) => {
    e.preventDefault();
    const user = await loginService({ username, password });
    setUser(user);
  };

  useEffect(() => {
    // if (user !== null) {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
    // }
  }, [user]);

  // const loginForm = () => {
  //   <form onSubmit={loginHandle}>
  //     <div>
  //       <label>
  //         username:
  //         <input
  //           type="text"
  //           onChange={(e) => setUsername(e.target.value)}
  //         />{" "}
  //       </label>

  //       <label>
  //         password:
  //         <input
  //           type="password"
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //       </label>
  //     </div>
  //     {/* <button onClick={loginHandle}>Login</button> */}
  //     <button type="submit">Login</button>
  //   </form>;
  // };

  if (user === null) {
    return (
      <div>
        <h2>Log in to Application</h2>
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
          {/* <button onClick={loginHandle}>Login</button> */}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} is logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
