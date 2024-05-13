"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Results", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      goal1: {
        type: Sequelize.INTEGER,
      },
      goal2: {
        type: Sequelize.INTEGER,
      },
      result: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Groups",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      notes: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Results");
  },
};
