'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('numeric-answers',
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
          type: Sequelize.FLOAT
        }
      }
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('numeric-answers');
  }
};
