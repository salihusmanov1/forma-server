'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Topics', [
      { name: "Education" },
      { name: "Geography" },
      { name: "Health and Wellness" },
      { name: "Technology" },
      { name: "Travel and Tourism" },
      { name: "Sports and Fitness" },
      { name: "Arts and Culture" },
      { name: "Environment and Sustainability" },
      { name: "Food and Nutrition" },
      { name: "Finance and Budgeting" },
      { name: "Entertainment and Media" },
      { name: "Science and Innovation" },
      { name: "Career and Professional Development" },
      { name: "Relationships and Social Life" },
      { name: "Lifestyle and Hobbies" },
      { name: "Real Estate and Housing" },
      { name: "Shopping and Retail" },
      { name: "Parenting and Family" },
      { name: "History and Anthropology" },
      { name: "Automotive and Transportation" }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Topics', null, {});

  }
};
