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
    await queryInterface.bulkInsert('Insects', [
      {
        name: 'Western Pygmy Blue Butterfly',
        description: ` Though they appear ornate and delicate, prehistoric fossils suggests that butterflies have been around for more than 200 million years. The pre-historic ancestors to the modern day butterfly fluttered amongst the dinosaurs during a time when there weren’t even pollen-rich flowers to feast on. They also managed to survive mass extinction events such as the ice age. Today, the order of Lepidopterous insects, currently comprise more than 180,000 species and include not only butterflies but also members of the moth family.

        The smallest member of the butterfly family is thought to be the pygmy blue butterfly (Brephidium exilis). The western pygmy can be found throughout North America and as far west as Hawaii and the middle east. It can be recognized by the copper brown and dull blue pattern at the bases of both wings. The tiny butterfly’s wingspan can be as little as 12 millimeters. Its counterpart, the eastern blue pygmy can be found in forests along the Atlantic coasts.`,
        territory: 'North America',
        fact: 'They also managed to survive mass extinction events such as the ice age.',
        millimeters: 12 
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Insects', {
      name: [
        'Western Pygmy Blue Butterfly'
      ]
    })
  }
};
