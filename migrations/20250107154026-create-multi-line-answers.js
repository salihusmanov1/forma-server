'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('multi-line-answers',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        response_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "responses",
            key: "id"
          },
        },
        question_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "questions",
            key: "id"
          }
        },
        answer: {
          allowNull: true,
          type: Sequelize.TEXT
        }
      }
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('multi-line-answers');
  }
};
