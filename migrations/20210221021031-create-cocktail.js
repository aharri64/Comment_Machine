'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cocktails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      drinkId: {
        type: Sequelize.INTEGER
      },
      drinkName: {
        type: Sequelize.STRING
      },
      ingredient1: {
        type: Sequelize.STRING
      },
      ingredient2: {
        type: Sequelize.STRING
      },
      ingredient3: {
        type: Sequelize.STRING
      },
      ingredient4: {
        type: Sequelize.STRING
      },
      ingredient5: {
        type: Sequelize.STRING
      },
      ingredient6: {
        type: Sequelize.STRING
      },
      ingredient7: {
        type: Sequelize.STRING
      },
      ingredient8: {
        type: Sequelize.STRING
      },
      ingredient9: {
        type: Sequelize.STRING
      },
      ingredient10: {
        type: Sequelize.STRING
      },
      ingredient11: {
        type: Sequelize.STRING
      },
      ingredient12: {
        type: Sequelize.STRING
      },
      ingredient13: {
        type: Sequelize.STRING
      },
      ingredient14: {
        type: Sequelize.STRING
      },
      ingredient15: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      month: {
        type: Sequelize.STRING
      },
      day: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cocktails');
  }
};