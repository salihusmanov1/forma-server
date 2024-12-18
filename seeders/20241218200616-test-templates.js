'use strict';
const generateTemplates = require("./factories/templateFactory")
const { Users } = require("../models")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await Users.findAll()
    const userIds = users.map((user) => user.id)
    const templates = await generateTemplates(userIds, 10)
    await queryInterface.bulkInsert('Templates', templates, {});
  },

  async down(queryInterface, Sequelize) {


    await queryInterface.bulkDelete('Templates', null, {});

  }
};
