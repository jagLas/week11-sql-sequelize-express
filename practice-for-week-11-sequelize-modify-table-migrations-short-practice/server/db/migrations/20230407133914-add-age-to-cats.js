'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Cats', 'age', {
      type: Sequelize.FLOAT
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Cats', 'age');
  }
};
