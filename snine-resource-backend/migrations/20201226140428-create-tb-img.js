'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_imgs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uploadUserId: {
        type: Sequelize.BIGINT
      },
      filesize: {
        type: Sequelize.BIGINT
      },
      filepath: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      uploadType: {
        type: Sequelize.BIGINT
      },
      classify: {
        type: Sequelize.STRING
      },
      fileStatus: {
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
    await queryInterface.dropTable('tb_imgs');
  }
};