import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: {},
  });

  const onChangeHandler = (event) => {
    setState({
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const { email, password, error } = state;
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1 className="text-center display-4">Login Here</h1>
        <form onSubmit={submitHandler}>
          <label for="email" className="form-label mt-2">
            Email:
          </label>
          <input
            className="form-control"
            name="email"
            type="text"
            placeholder="Enter valid email"
            value={email}
            id="email"
            onChange={onChangeHandler}
          />
          <label for="password" className="form-label mt-2">
            Password:
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            id="password"
            onChange={onChangeHandler}
          />
          <Link to="/register" className="d-block mt-2">
            Do you need an account?
          </Link>
          <button type="submit" class="btn btn-success mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
