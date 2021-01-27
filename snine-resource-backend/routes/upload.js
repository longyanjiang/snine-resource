const fs = require('fs');
const express = require('express');
const multer  = require('multer');
const path = require('path');
const router = express.Router();
const marked = require('marked');
const Result = require('../utils/Result')
let models = require('../models/index')
const {isImg, writeInFile, isHasDir, rename} = require('../tools/index');

/** multer文件上传中间件参数配置了解 https://www.cnblogs.com/sexintercourse/p/11783741.html */
/** upload.any() 这样写代表接收任何键值的文件 upload.single('file')：这样表示只接收文件的键是file的文件  接收一个数组,可以限制键为什么才接收*/
const upload = multer({dest: '../public/files',limits: {
    fileSize:300 * 1024 * 1024, //允许上传文件的最大大小20m
    files: 9, //允许一次上传最多多少个文件
}});

/**,
 * @swagger
 * /api/upload/file:
 *    post:
 *      tags: 
 *      - upload
 *      summary: 文件上传
 *      description: 图片文件上传
 *      produces:
 *      - multipart/form-data
 *      parameters:
 *      - name: uploadUserId
 *        in: body
 *        description: 上传的用户id，如果没有注册默认-1为未注册的用户上传的文件
 *        required: false
 *        type: integer
 *        maximum: 10
 *        minimum: 1
 *      - name: classify
 *        in: body
 *        description: 图片分类，用户可以自定义添加分类，一张图片只能属于一个分类，默认图片没有分类
 *        required: false
 *        type: integer
 *        maximum:
 *        minimum: 1
 *      responses:
 *        code:
 *          description: 1:成功 -1:失败
 *        data:
 *          description: 拿到的返回值
 *        msg:
 *          description: 提示信息
 * */
router.post('/file', upload.any(), async(req, res) => {
    const {uploadUserId = -1, uploadType = 2, classify = -1, fileStatus = 0 } = req.body
    /** 1:首先拿到用户上传的文件 储存在req.files中 */
    const allFiles = req.files
    /** 2:判断有没有files文件和images文件夹 没有就创建，同步方法 */
    isHasDir()
    /** 3:循环遍历拿到文件和文件名 */
    let fileList = []
    for (let i = 0; i < allFiles.length; i++) {
        let saveDir = isImg(allFiles[i].mimetype) ? '../public/images/' : '../public/files/'
        let newFilename = rename(allFiles[i].originalname) //对文件名称重名名防止文件覆盖或者冲突
        let writePath = path.join(__dirname, saveDir + newFilename) //写入的地址
        writeInFile(allFiles[i].path,writePath) //同步写入文件到public静态资源文件夹下面
        let dirName = saveDir.split('../public/')[1] //拿到本次类型文件存入的文件夹名称
        let prefix = (process.env.NODE_ENV === 'development') ? 'http://localhost:5288/' : 'https://resource.jiangly.com/'
        const filepath = `${prefix}${dirName}${newFilename}`
        /** 整合信息放入数组批量存入 */
        const fileInfo = {
            uploadUserId,  //上传的用户id，默认-1，没有登录就上传了
            filesize:allFiles[i].size, //上传的文件大小，最大不允许20m
            filepath,  //文件的路径远程获取的url
            filename:allFiles[i].originalname, //文件的名称
            uploadType, //上传类型，默认为2普通上传，自己用上传为1，迁移或者清理的时候方便暴露自己需要的文件
            classify, //文件分类，用户可以自定义分类，每个图片只能有一个分类，默认为空
            fileStatus //文件状态，默认为0，审核中，1:审核通过 -1:审核拒绝不通过
        }
        fileList.push(fileInfo)
    }
    const result = await models.tb_file.bulkCreate(fileList)
    const resData = result.map( t => {
        return { url: t.filepath, filename: t.filename, filesize: t.filesize }
    })
    new Result(resData).success(res)
});


router.post('/article', upload.any(), async(req, res) => {
    const {authorId = -1, uploadType = 3, classify = -1, status = 0 } = req.body
    const {id, username} = req.user
    /** 1:首先拿到用户上传的文章，是个数组 储存在req.files中 */
    const allmd = req.files
    isHasDir() //判断有没有md文件夹，没有就创建，用于存放文件
    let mdList = [];
    for (let i = 0; i < allmd.length; i++) {
        let newFilename = rename(allmd[i].originalname) //对文件名称重名名防止文件覆盖或者冲突
        let saveDir = '../public/md/'
        let writePath = path.join(__dirname, saveDir + newFilename) //写入的地址
        writeInFile(allmd[i].path,writePath) //同步写入文件到public静态资源文件夹下面
        let dirName = saveDir.split('../public/')[1] //拿到本次类型文件存入的文件夹名称,因为public这一层路径不需要
        let prefix = (process.env.NODE_ENV === 'development') ? 'http://localhost:5288/' : 'https://resource.jiangly.com/'
        const buffer = fs.readFileSync(allmd[i].path)
        const content = buffer.toString()
        const html = marked(content)
        const filepath = `${prefix}${dirName}${newFilename}`
        const articleName = allmd[i].originalname.split('.md')[0]
        const mdInfo = {
            authorId: id,  //上传的用户id，默认-1，没有登录就上传了
            authorName:username,
            content,
            html,
            desc: '',
            cover: '',
            filesize:allmd[i].size, //上传的文件大小，最大不允许20m
            articleName, //文件的名称
            uploadType:1, //上传类型，默认为2普通上传，自己用上传为1，迁移或者清理的时候方便暴露自己需要的文件
            classify:1, //文件分类，用户可以自定义分类，每个图片只能有一个分类，默认为空
            status:1 //文件状态，默认为0，审核中，1:审核通过 -1:审核拒绝不通过
        }
        mdList.push(mdInfo)
    }
    const result = await models.tb_article.bulkCreate(mdList)
    console.log('resultresultresultresult',result);
    new Result(result).success(res)
})

router.get('/allImg', async(req, res) => {
    console.log(req.user);
})


module.exports = router;




