"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Group }) {
      // define association here
      this.belongsTo(Group, { foreignKey: "group_id" });
    }
  }
  Result.init(
    {
      goal1: DataTypes.INTEGER,
      goal2: DataTypes.INTEGER,
      result: DataTypes.STRING,
      date: DataTypes.DATE,
      group_id: DataTypes.INTEGER,
      notes: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Result",
    }
  );
  return Result;
};
