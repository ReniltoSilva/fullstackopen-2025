import { useState } from "react";

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const callLogin = (e) => {
    e.preventDefault();

    handleSubmit({ username, password });

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={callLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>

    // <div>
    //   <h2>Login</h2>

    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       username
    //       <input value={username} onChange={handleUsernameChange} />
    //     </div>
    //     <div>
    //       password
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={handlePasswordChange}
    //       />
    //     </div>
    //     <button type="submit">login</button>
    //   </form>
    // </div>
  );
};

export default LoginForm;
