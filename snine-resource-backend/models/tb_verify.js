'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_verify extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_verify.init({
    Email: DataTypes.STRING,
    Code: DataTypes.STRING,
    SendTime: DataTypes.TIME,
    Total: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'tb_verify',
  });
  return tb_verify;
};