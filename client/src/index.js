import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import * as Type from "./store/actions/types";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

const token = localStorage.getItem("auth_token");

if (token) {
  let decode = jwtDecode(token);
  setAuthToken(token);
  store.dispatch({
    type: Type.SET_USER,
    payload: {
      user: decode,
    },
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
