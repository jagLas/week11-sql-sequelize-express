'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Colors', [
      {
        name: 'mauve',
        createdAt: new Date('2000-04-06 18:19:27')
      },
      {
        name: 'aqua marine',
        createdAt: '2000-04-06 18:19:27'
      },
      {
        name: 'beige',
        createdAt: '2000-04-06 18:19:27'
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Colors', {
      name: ['mauve', 'aqua marine', 'beige']
    })
  }
};
