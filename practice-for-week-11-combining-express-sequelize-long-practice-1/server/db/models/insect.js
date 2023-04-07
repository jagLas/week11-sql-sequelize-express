'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Insect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Insect.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,

        isTitleCased(value) {
          value = value.split(' ');
          for (let i = 0; i < value.length; i++) {
              const letter = value[i][0];
              if (letter.toUpperCase() !== letter) {
                  throw new Error('Name must be titlecased')
              }
          };
        }
      }
    },
    description: DataTypes.STRING,
    territory: DataTypes.STRING,
    fact: {
      type: DataTypes.STRING(240),
      validate: {
        // custom validation is necessary, as sqlite does not enforce varchar restrictions
        is240(value){
          if (value.length > 240) {
            throw new Error('Fact cannot have more than 240 characters')
          }
        }
      }
    },
    millimeters:{
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'Insect',
  });
  return Insect;
};