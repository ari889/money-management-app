import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/authActions";

const Navbar = (props) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page" href="#">
                Home
              </NavLink>
            </li>
            {props.auth.isAuthentickted && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/dashboard"
                    className="nav-link"
                    aria-current="page"
                  >
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {!props.auth.isAuthentickted ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" aria-current="page">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className="nav-link"
                  aria-current="page"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href="#"
                  onClick={() => props.logout(navigate)}
                >
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
