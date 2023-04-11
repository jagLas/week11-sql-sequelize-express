'use strict';

const {Band, Musician} = require('../models')

const bandMusicians = [
  {
    name: 'The Falling Box',
    musicians: [
      {firstName: 'Adam', lastName: 'Appleby'},
      { firstName: 'Anton', lastName: 'Martinovic' },
      { firstName: 'Wilson', lastName: 'Holt' }
    ]
  },
  {
    name: 'America The Piano',
    musicians: [
      { firstName: 'Marine', lastName: 'Sweet' },
      { firstName: 'Georgette', lastName: 'Kubo' }
    ]
  },
  {
    name: 'Loved Autumn',
    musicians: [
      { firstName: 'Aurora', lastName: 'Hase' }
    ]
  },
  {
    name: 'Playin Sound',
    musicians: [
      { firstName: 'Trenton', lastName: 'Lesley' },
      { firstName: 'Camila', lastName: 'Nenci' }
    ]
  },
  {
    name: 'The King River',
    musicians: [
      { firstName: 'Rosemarie', lastName: 'Affini' },
      { firstName: 'Victoria', lastName: 'Cremonesi' }
    ]
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < bandMusicians.length; i++) {
      const {name, musicians} = bandMusicians[i];
      const band = await Band.findOne({name: name});
      for (let i = 0; i < musicians.length; i++) {
        await band.createMusician(musicians[i]);
      }
      
    }
  },

  down: async (queryInterface, Sequelize) => {
    for (let i = 0; i < bandMusicians.length; i++) {
      const {musicians} = bandMusicians[i];
      console.log(musicians)
      for (let i = 0; i < musicians.length; i++) {
        const musician = await Musician.findOne({name: musicians[i]})
        await musician.destroy();
      }
    }
  }
};
