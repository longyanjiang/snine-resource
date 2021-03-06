'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_file.init({
    uploadUserId: DataTypes.BIGINT,
    filesize: DataTypes.BIGINT,
    filepath: DataTypes.STRING,
    filename: DataTypes.STRING,
    uploadType: DataTypes.BIGINT,
    classify: DataTypes.STRING,
    fileStatus: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'tb_file',
  });
  return tb_file;
};