'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_tag.init({
    tagName: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_tag',
  });
  return tb_tag;
};