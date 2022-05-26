'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'Categories', [
      {
      nombre: 'Escobas',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Accesorios',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Elfos',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nombre: 'Pociones',
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ])
  },

  async down (queryInterface, Sequelize) {
  }
};