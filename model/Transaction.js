const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    amount: {
      type: Number,
      require: true,
      trim: true,
    },
    type: {
      type: String,
      require: true,
      trim: true,
    },
    note: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
