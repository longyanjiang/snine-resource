const express = require('express');
const router = express.Router();
const Result = require('../utils/Result');
const models = require('../models')
const {removeEmpty} = require('../tools/index')
const Op = models.Sequelize.Op;

router.get('/allImg', async (req, res) => {
    let currentPage = parseInt(req.body.currentPage) || 1
    let pageSize = parseInt(req.body.pageSize) || 10
    let where = {
        uploadUserId: req.user.id,
        filename: req.query.keyword ? {[Op.like]: '%' + req.query.keyword + '%'} : '',
        // fileStatus: 1  //查询审核通过的图片
    };
    const result = await models.tb_file.findAndCountAll({
        where:removeEmpty(where),
        order: [['id', 'DESC']], //倒叙的方式输出 对比id 默认为ASC正序
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
    })
    new Result(result, `接口返回成功`).success(res)
});

router.get('/article', async (req, res) => {
    let currentPage = parseInt(req.body.currentPage) || 1
    let pageSize = parseInt(req.body.pageSize) || 10
    let where = {
        authorId: req.user.id,
        articleName: req.query.keyword ? {[Op.like]: '%' + req.query.keyword + '%'} : '',
    };
    const result = await models.tb_article.findAndCountAll({
        where:removeEmpty(where),
        order: [['id', 'DESC']], //倒叙的方式输出 对比id 默认为ASC正序
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
    })
    new Result(result, `接口返回成功`).success(res)
});




//工具函数  用来处理数据的 
router.get('/update', async(req, res) => {
    const result = await models.tb_file.update({fileStatus:1},{
        where: {fileStatus:0}
    })
})







module.exports = router;
