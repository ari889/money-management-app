import Axios from "axios";
import * as Types from "./types";

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
