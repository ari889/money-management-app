import * as Types from "../actions/types";

const transactionReducer = (state = [], action) => {
  switch (action.type) {
    case Types.LOAD_TRANSACTIONS: {
      return action.payload.transactions;
    }
    case Types.CREATE_TRANSACTION: {
      let transactions = [...state];
      transactions.unshift(action.payload.transaction);
      return transactions;
    }
    case Types.DELETE_TRANSACTION: {
      let transactions = [...state];
      return transactions.filter((tran) => {
        return tran._id !== action.payload.id;
      });
    }
    default:
      return state;
  }
};

export default transactionReducer;
