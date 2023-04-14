'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Photos', [{
      title: 'Foto Pertama Milik UserID 1',
      caption : 'Ini Foto pertama milik Userid 1',
      image_url: 'https://photopertama.com',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    
    },
    {
      title: 'Foto Kedua Milik UserID 1',
      caption: 'ini Foto Kedua milik Userid 2',
      image_url: 'https://photokedua.com',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Foto Ketiga Milik UserID 1',
      caption: 'ini Foto Ketiga milik Userid 2',
      image_url: 'https://photoketiga.com',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
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
