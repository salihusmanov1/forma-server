'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_id: {
        allowNull: false,
        references: {
          model: 'questions',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('options')
  }
};
