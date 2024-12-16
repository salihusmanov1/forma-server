'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('templates', 'image_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('templates', 'topic_id', {
      type: Sequelize.BIGINT,
      allowNull: false,  // topic_id can be null initially

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('templates', 'image_url');
    await queryInterface.removeColumn('templates', 'topic_id');
  }
};
