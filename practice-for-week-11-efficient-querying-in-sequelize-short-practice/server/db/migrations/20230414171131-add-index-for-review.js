'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addIndex(
      'Reviews',
      ['reviewerId']
    )

    // await queryInterface.addIndex(
    //   'Reviewer',
    //   'firstName'
    // )

    // await queryInterface.addIndex(
    //   'Reviewer',
    //   ['firstName', 'lastName']
    // )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex(
      'Reviewers',
      ['reviewerId']
    )

    // await queryInterface.removeIndex(
    //   'Reviewers',
    //   'firstName'
    // )

    // await queryInterface.removeIndex(
    //   'Reviewers',
    //   ['firstName', 'lastName']
    // )
  }
};
