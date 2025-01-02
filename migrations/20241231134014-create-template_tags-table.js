'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('template_tag', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      template_id: {
        references: {
          model: "templates",
          key: "id"
        },
        type: Sequelize.INTEGER
      },
      tag_id: {
        references: {
          model: "tags",
          key: "id"
        },
        type: Sequelize.INTEGER
      }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('template_tag');
  }
};
