'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_article.init({
    authorId: DataTypes.BIGINT,
    authorName: DataTypes.STRING,
    articleName: DataTypes.STRING,
    content: DataTypes.TEXT,
    html: DataTypes.TEXT,
    desc: DataTypes.STRING,
    cover: DataTypes.STRING,
    class: DataTypes.BIGINT,
    status: DataTypes.BIGINT,
    readVal: DataTypes.BIGINT,
    praiseVal: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'tb_article',
  });
  return tb_article;
};