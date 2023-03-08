import Axios from "axios";
import * as Types from "./types";
import jwtDecode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

export const register = (user, navigate) => (dispatch) => {
  Axios.post("/api/users/register", user)
    .then((response) => {
      dispatch({
        type: Types.USERS_ERROR,
        payload: {
          error: {},
        },
      });
      navigate("/login");
    })
    .catch((error) => {
      dispatch({
        type: Types.USERS_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

export const login = (user, navigate) => (dispatch) => {
  Axios.post("api/users/login", user)
    .then((response) => {
      let token = response.data.token;
      localStorage.setItem("auth_token", token);
      setAuthToken(token);
      let decode = jwtDecode(token);
      dispatch({
        type: Types.SET_USER,
        payload: {
          user: decode,
        },
      });
      navigate("/");
    })
    .catch((error) => {
      dispatch({
        type: Types.USERS_ERROR,
        payload: {
          error: error.response.data,
        },
      });
    });
};

export const logout = (navigate) => {
  localStorage.removeItem("auth_token");
  navigate("/login");
  return {
    type: Types.SET_USER,
    payload: {
      user: {},
    },
  };
};
