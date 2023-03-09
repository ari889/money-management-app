import * as Types from "../actions/types";
import Axios from "axios";

export const loadTransactions = () => (dispatch) => {
  Axios.get("/api/transactions/")
    .then((response) => {
      console.log(response.data, "transactions");
      dispatch({
        type: Types.LOAD_TRANSACTIONS,
        payload: {
          transactions: response.data,
        },
      });
    })
    .catch((error) => console.log(error));
};
