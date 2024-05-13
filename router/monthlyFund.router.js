const express = require("express");
const {
    createMonthlyFund
 
} = require("../controller/MonthyFund.controller");
const { authenticate } = require("../middlewares/auth/authenticate");

const monthlyFundRouter = express.Router();
monthlyFundRouter.post("/", authenticate, createMonthlyFund);


module.exports = { monthlyFundRouter };
