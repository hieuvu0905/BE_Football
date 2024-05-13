const { Member, Group, MonthyFund, sequelize } = require("../models");
const convertDateFormat = require("../ultils/convertDate");
const { moveNumberToEnd } = require("../ultils/moveNumberToEnd");
const createMember = async (req, res) => {
  const { fullname, birthday, tshift, position, groupId } = req.body;
  const userId = req.user.id;
  if (!fullname || !birthday || !tshift || !position || !groupId) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  try {
    const foundGroup = await Group.findByPk(groupId);
    if (!foundGroup) {
      return res.status(404).send({ error: "Group not found" });
    }

    const existingMember = await Member.findOne({
      where: { tshift, group_id: groupId },
    });
    if (existingMember) {
      return res.status(404).send({ error: "tshift number already exist" });
    }

    const isCaptain = position === "captain";
    const existingCaptain = await Member.findOne({
      where: { position: "Captain", group_id: groupId },
    });
    if (isCaptain && existingCaptain) {
      return res.status(404).send({ error: "Group have only one captain" });
    }

    const response = await Member.create({
      fullname,
      birthday: convertDateFormat(birthday),
      tshift,
      position,
      group_id: groupId,
    });
    let currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let formattedMonth = month < 10 ? "0" + month : month;
    const date = `${formattedMonth}/${year}`;
    let foundMonthlyFund = await MonthyFund.findOne({
      where: { groupId: groupId, date },
    });
    if (!foundMonthlyFund) {
      res.status(201).send({
        status: 201,
        message: "Member created successfully",
      });
    } else {
      if (response.id) {
        let result = moveNumberToEnd(
          `${response.id}`,
          foundMonthlyFund.uncontributed_list,
          response.id
        );
        foundMonthlyFund.uncontributed_list = result[1];
        foundMonthlyFund.save();
      }

      res.status(201).send({
        status: 201,
        message: "Member created successfully",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateMember = async (req, res) => {
  const { id } = req.params;
  const { fullname, birthday, tshift, position } = req.body;
  try {
    const detailMember = await Member.findOne({
      where: {
        id,
      },
    });
    detailMember.fullname = fullname;
    detailMember.birthday = birthday;
    detailMember.tshift = tshift;
    detailMember.position = position;

    await detailMember.save();
    res.status(200).send(detailMember);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getAllMember = async (req, res) => {
  const memberList = await Member.findAll({
    include: [
      {
        model: Group,
        attributes: ["name"],
      },
    ],
  });
  res.status(200).send(memberList);
};
const deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    await Member.destroy({
      where: {
        id,
      },
    });
    await MonthyFund.update({
      uncontributed_list: sequelize.fn(
        "array_remove",
        sequelize.col("uncontributed_list"),
        id
      ),
      list_no_need: sequelize.fn("array_remove", sequelize.col("list_no_need")),
      contributed_list: sequelize.fn(
        "array_remove",
        sequelize.col("contributed_list")
      ),
    });
    res.status(200).send("Xóa thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createMember, updateMember, deleteMember, getAllMember };
