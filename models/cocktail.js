'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cocktail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cocktail.init({
    drinkId: DataTypes.INTEGER,
    drinkName: DataTypes.STRING,
    ingredient1: DataTypes.STRING,
    ingredient2: DataTypes.STRING,
    ingredient3: DataTypes.STRING,
    ingredient4: DataTypes.STRING,
    ingredient5: DataTypes.STRING,
    ingredient6: DataTypes.STRING,
    ingredient7: DataTypes.STRING,
    ingredient8: DataTypes.STRING,
    ingredient9: DataTypes.STRING,
    ingredient10: DataTypes.STRING,
    ingredient11: DataTypes.STRING,
    ingredient12: DataTypes.STRING,
    ingredient13: DataTypes.STRING,
    ingredient14: DataTypes.STRING,
    ingredient15: DataTypes.STRING,
    rating: DataTypes.STRING,
    month: DataTypes.STRING,
    day: DataTypes.STRING,
    year: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cocktail',
  });
  return cocktail;
};