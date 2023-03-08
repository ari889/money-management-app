import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../store/actions/authActions";

const Login = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: props.auth.error,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      error: props.auth.error,
    }));
  }, [props.auth.error]);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.login(
      {
        email: state.email,
        password: state.password,
      },
      navigate
    );
  };

  const { email, password, error } = state;
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1 className="text-center display-4">Login Here</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="email" className="form-label mt-2">
            Email:
          </label>
          <input
            className={error.email ? "form-control is-invalid" : "form-control"}
            name="email"
            type="text"
            placeholder="Enter valid email"
            value={email}
            id="email"
            onChange={onChangeHandler}
          />
          {error.email && <div className="invalid-feedback">{error.email}</div>}
          <label htmlFor="password" className="form-label mt-2">
            Password:
          </label>
          <input
            className={
              error.password ? "form-control is-invalid" : "form-control"
            }
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            id="password"
            onChange={onChangeHandler}
          />
          {error.password && (
            <div className="invalid-feedback">{error.password}</div>
          )}
          <Link to="/register" className="d-block mt-2">
            Do you need an account?
          </Link>
          <button type="submit" className="btn btn-success mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
