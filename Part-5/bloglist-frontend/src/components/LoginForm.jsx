import { useState } from "react";

const LoginForm = ({ loginHandle }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendCredentials = (e) => {
    e.preventDefault();
    loginHandle({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={sendCredentials}>
      <div>
        <label>
          Username:
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
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

export default LoginForm;
