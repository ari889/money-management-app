import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CreateTransaction from "../components/transaction/CreateTransaction";
import {
  loadTransactions,
  removeTransaction,
} from "../store/actions/transactionAction";

const Dashboard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    props.loadTransactions();
  }, []);

  const onChangeModal = () => {
    setIsOpen((prevState) => !prevState);
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
            onClick={onChangeModal}
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
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CreateTransaction isOpen={isOpen} toggle={onChangeModal} />
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
