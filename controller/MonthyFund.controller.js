const {
  MonthyFund,
  Member,
  Transaction,
  Group,
  sequelize,
} = require("../models");
const { Op, where } = require("sequelize");
const convertDateFormat = require("../ultils/convertDate");

const createMonthlyFund = async (req, res) => {
  const { date, member_needs_to_pay, type } = req.body;
  const id = req.user.id;
  try {
    if (type !== 3) {
      return res.status(400).json({ error: "Invalid transaction type" });
    }
    const existingMonthlyFund = await MonthyFund.findOne({
      where: { type: 3, date: date },
    });

    if (existingMonthlyFund) {
      return res
        .status(400)
        .json({ error: `Monthly fund for ${date} already exists` });
    }
    const findGroup = await Group.findOne({ where: { userId: id } });
    if (!findGroup) {
      return res.status(404).json({ error: "Group not found" });
    }
    const findMember = await Member.findAll({
      attributes: ["id"],
    });
   
    if (!findMember) {
      return res
        .status(404)
        .json({ error: "Add members to the group before creating a fund" });
    }
    const uncontributed_list = await findMember
      .map((member) => member.id)
      .join(",");
    await MonthyFund.create({
      groupId: findGroup.id,
      date,
      member_needs_to_pay,
      type,
      collected: 0,
      list_no_need: "",
      contributed_list: "",
      uncontributed_list,
    });
    res.status(201).send({
      status: 200,
      mes: "Create monthly fund",
    });
  } catch (error) {
    console.log("🚀 ~ createTransaction ~ error:", error);
    res.status(500).send(error);
  }
};
module.exports = { createMonthlyFund };
