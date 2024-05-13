const express = require("express");
const {
  getAllTransaction,
  createTransaction,
  getTransactionByMonth,
  getTransactionById,
  getTransactionByDay,
  getFundBalance,
} = require("../controller/Transaction.controller");
const { authenticate } = require("../middlewares/auth/authenticate");

const transactionFundRouter = express.Router();

transactionFundRouter.get("/all", getAllTransaction);
transactionFundRouter.get("/month", getTransactionByMonth);
transactionFundRouter.get("/day", getTransactionByDay);
transactionFundRouter.get("/id/:id", getTransactionById);
transactionFundRouter.post("/", authenticate, createTransaction);
transactionFundRouter.get("/balance", getFundBalance);

module.exports = { transactionFundRouter };
