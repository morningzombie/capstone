import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Login = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();
  const goToUpload = () => history.push('/file/upload');

  const onSubmit = (ev) => {
    ev.preventDefault();
    login({ email, password })
      .then(() => goToUpload())
      .catch((ex) => {
        setError(ex.response.data.message);
      });
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <div className="error">{error}</div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <button className="btn btn-primary">Log In</button>
      </form>
      <hr />
      <Link to="/register">Create Account</Link>
    </div>
  );
};

export default Login;
