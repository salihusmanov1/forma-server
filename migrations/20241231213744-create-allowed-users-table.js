'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('allowed-users', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      form_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "forms",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      user_email: {
        type: Sequelize.STRING,
        references: {
          model: "users",
          key: "email"
        },
        onDelete: "CASCADE"
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('allowed-users');
  }
};
