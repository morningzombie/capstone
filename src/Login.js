import React, { useState, useEffect } from "react";

const Login = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onSubmit = (ev) => {
    ev.preventDefault();
    login({ username, password }).catch((ex) =>
      setError(ex.response.data.message)
    );
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h1>Login</h1>
          <div className="error">{error}</div>
          <label htmlFor="usr">Name:</label>
          <input
            className="form-control"
            id="usr"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <label htmlFor="pwd">Password:</label>

          <input
            className="form-control"
            id="pwd"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
