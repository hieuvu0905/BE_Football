"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init(
    {
      type: DataTypes.INTEGER,
      content: DataTypes.STRING,
      value: DataTypes.INTEGER,
      note: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      timestamps: false,
    }
  );
  return Transaction;
};
