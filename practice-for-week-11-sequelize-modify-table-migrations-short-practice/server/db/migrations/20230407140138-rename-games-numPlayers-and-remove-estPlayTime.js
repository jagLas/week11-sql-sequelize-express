'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Games', 'numPlayers', 'MaxPlayers');

    await queryInterface.removeColumn('Games', 'estPlayTime');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Games', 'MaxPlayers', 'numPlayers');

    await queryInterface.addColumn('Games', 'estPlayTime', {
      type: Sequelize.INTEGER
    })
  }
};
