'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorId: {
        type: Sequelize.BIGINT
      },
      authorName: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      html: {
        type: Sequelize.TEXT
      },
      desc: {
        type: Sequelize.STRING
      },
      cover: {
        type: Sequelize.STRING
      },
      class: {
        type: Sequelize.BIGINT
      },
      status: {
        type: Sequelize.BIGINT
      },
      readVal: {
        type: Sequelize.BIGINT
      },
      praiseVal: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_articles');
  }
};