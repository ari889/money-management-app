import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { updateTransaction } from "../../store/actions/transactionAction";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const UpdateTransaction = (props) => {
  const [state, setState] = useState({
    amount: 0,
    note: "",
    error: {},
  });

  useEffect(() => {
    setState({
      ...state,
      amount: props.transaction.amount,
      note: props.transaction.note,
    });
  }, []);

  const { amount, note, error } = state;

  const onChangeHandler = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let { amount, note } = state;
    props.updateTransaction(props.transaction._id, {
      amount,
      note,
    });
    props.close();
    setState({
      amount: 0,
      note: "",
      error: {},
    });
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.close}
      style={customStyles}
      contentLabel="Create new transaction"
    >
      <h2>Update transaction</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount" className="form-label mt-2">
          Amount:
        </label>
        <input
          className={error.amount ? "form-control is-invalid" : "form-control"}
          name="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          id="email"
          onChange={onChangeHandler}
        />
        {error.amount && <div className="invalid-feedback">{error.amount}</div>}
        <label htmlFor="note" className="form-label mt-2">
          Note:
        </label>
        <textarea
          className={error.note ? "form-control is-invalid" : "form-control"}
          name="note"
          placeholder="Enter note"
          value={note}
          id="note"
          onChange={onChangeHandler}
        ></textarea>
        {error.note && <div className="invalid-feedback">{error.note}</div>}
        <div className="btn-group mt-2 d-table ms-auto">
          <button type="submit" className="btn btn-success">
            Save
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={props.close}
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default connect(null, { updateTransaction })(UpdateTransaction);
