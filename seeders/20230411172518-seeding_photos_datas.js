'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Photos', [{
      title: 'Foto Jadul',
      caption: 'Jadoel Bangeutz',
      image_url:'facebook.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { title: 'Foto Kenangan',
      caption: 'Jadoel Bangeutz',
      image_url:'facebook.com',
      createdAt: new Date(),
      updatedAt: new Date(),
  }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
