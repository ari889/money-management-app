import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CreateTransaction from "../components/transaction/CreateTransaction";
import UpdateTransaction from "../components/transaction/UpdateTransaction";
import {
  loadTransactions,
  removeTransaction,
} from "../store/actions/transactionAction";

const Dashboard = (props) => {
  let [state, setState] = useState({
    isOpenCreate: false,
    isOpenUpdate: false,
    id: "",
  });

  useEffect(() => {
    props.loadTransactions();
  }, []);

  const openCreateModal = () => {
    setState((prevState) => ({
      ...state,
      isOpenCreate: true,
    }));
  };
  const closeCreateModal = () => {
    setState((prevState) => ({
      ...state,
      isOpenCreate: false,
    }));
  };
  const openUpdateModal = (id) => {
    setState((prevState) => ({
      ...state,
      isOpenUpdate: true,
      id: id,
    }));
  };
  const closeUpdateModal = () => {
    setState((prevState) => ({
      ...state,
      isOpenUpdate: false,
      id: "",
    }));
  };

  let { auth, transactions } = props;

  return (
    <>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2>Welcome {auth.user.name}</h2>
          <p>Your Email is {auth.user.email}</p>
          <button
            type="button"
            className="btn btn-success"
            onClick={openCreateModal}
          >
            Create Transactions
          </button>
          <br />
          <h1>Trasactions:</h1>
          <ul className="list-group">
            {transactions.map((transaction) => (
              <li key={transaction._id} className="list-group-item">
                <p>Type: {transaction.type}</p>
                <p>Amount: {transaction.amount}</p>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => props.removeTransaction(transaction._id)}
                >
                  Remove
                </button>
                {state.id === transaction._id ? (
                  <UpdateTransaction
                    isOpen={state.isOpenUpdate}
                    close={closeUpdateModal}
                    transaction={transaction}
                  />
                ) : null}
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => openUpdateModal(transaction._id)}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CreateTransaction isOpen={state.isOpenCreate} close={closeCreateModal} />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  transactions: state.transactions,
});

export default connect(mapStateToProps, {
  loadTransactions,
  removeTransaction,
})(Dashboard);
