'use strict';

const {Insect, Tree} = require('../models')

const seedData = [
  {
    insect: { name: "Western Pygmy Blue Butterfly" },
    trees: [
      { tree: "General Sherman" },
      { tree: "General Grant" },
      { tree: "Lincoln" },
      { tree: "Stagg" },
    ],
  },
  {
    insect: { name: "Patu Digua Spider" },
    trees: [
      { tree: "Stagg" },
    ],
  },
]

async function seeder(add) {
  for (let i = 0; i < seedData.length; i++ ) {
    const {insect, trees} = seedData[i];
    const targetInsect = await Insect.findOne({
      where: insect
    })
    for (let i = 0; i < trees.length; i++) {
      const tree = await Tree.findOne({
        where: trees[i]
      })

      if(add === true) {
        targetInsect.addTree(tree)
      } else {
        targetInsect.removeTree(tree)
      }
    }
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await seeder(true)
  },

  async down (queryInterface, Sequelize) {
    await seeder(false)
  }
};
