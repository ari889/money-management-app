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

export const addNewTransaction = (transaction) => (dispatch) => {
  Axios.post("/api/transactions/", transaction)
    .then((response) => {
      dispatch({
        type: Types.CREATE_TRANSACTION,
        payload: {
          transaction: response.data,
        },
      });
    })
    .catch((error) => console.log(error));
};

export const removeTransaction = (id) => (dispatch) => {
  Axios.delete(`/api/transactions/${id}`)
    .then((response) => {
      dispatch({
        type: Types.DELETE_TRANSACTION,
        payload: { id: response.data._id },
      });
    })
    .catch((error) => console.log(error));
};
