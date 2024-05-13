const express = require("express");
const { userRouter } = require("./user.router");
const { groupRouter } = require("./group.router");
const { memberRouter } = require("./member.router");
const { transactionFundRouter } = require("./transaction.router");
const { monthlyFundRouter } = require("./monthlyFund.router");

const { authenticate } = require("../middlewares/auth/authenticate");
const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/members", memberRouter);
rootRouter.use("/groups", groupRouter);
rootRouter.use("/transactions", transactionFundRouter);
rootRouter.use("/monthyfund", monthlyFundRouter);

rootRouter.use((req, res, next) => {
  return res.status(404).send({
    status: 404,
    message: "Not found",
  });
});

module.exports = { rootRouter };
