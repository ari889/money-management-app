import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../store/actions/authActions";

const Register = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    let { name, email, password, confirmPassword } = state;
    props.register(
      {
        name,
        email,
        password,
        confirmPassword,
      },
      navigate
    );
  };

  const { name, email, password, confirmPassword, error } = state;

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1 className="text-center display-4">Register Here</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="name" className="form-label mt-2">
            Name:
          </label>
          <input
            className={error.name ? "form-control is-invalid" : "form-control"}
            name="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            id="name"
            onChange={onChangeHandler}
          />
          {error.name && <div className="invalid-feedback">{error.name}</div>}
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
          <label htmlFor="confirmPassword" className="form-label mt-2">
            Confirm Password:
          </label>
          <input
            className={
              error.confirmPassword ? "form-control is-invalid" : "form-control"
            }
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            id="confirmPassword"
            onChange={onChangeHandler}
          />
          {error.confirmPassword && (
            <div className="invalid-feedback">{error.confirmPassword}</div>
          )}
          <Link to="/login" className="d-block mt-2">
            Already have an account?
          </Link>
          <button type="submit" className="btn btn-success mt-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);
