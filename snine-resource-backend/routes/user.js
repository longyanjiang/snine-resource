const express = require('express');
const router = express.Router();
const {sendEmail} = require('../utils/sendEmail')
const Result = require('../utils/Result');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { SECRET_KEY, EXPIRES_TIME } = require('../utils/constant')
const models = require('../models')
/**,
 * @swagger
 * /api/user/test:
 *    get:
 *      tags: 
 *      - test
 *      summary: 测试
 *      description: 测试
 *      operationId: ''
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: params1
 *        in: query
 *        description: 参数1
 *        required: false
 *        type: string
 *        maximum: 10
 *        minimum: 1
 *        format:
 *      - name: params1
 *        in: query
 *        description: 参数2
 *        required: true
 *        type: integer
 *        maximum:
 *        minimum: 1
 *        format:
 *      responses:
 *        200:
 *          description: 返回成功
 * */
router.get('/test', function(req, res, next) {
  new Result({a:123}, `接口返回成功`).success(res)
});

/**,
 * @swagger
 * /api/user/register:
 *    post:
 *      tags: 
 *      - USER
 *      summary: 注册
 *      description: 注册接口
 *      operationId: ''
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: username
 *        in: body
 *        description: 用户用户名
 *        required: true
 *        type: string
 *      - name: nickname
 *        in: body
 *        description: 用户昵称
 *        required: true
 *        type: string
 *      - name: password
 *        in: body
 *        description: 用户密码
 *        required: true
 *        type: integer
 *      - name: email
 *        in: body
 *        description: 用户邮箱
 *        required: true
 *        type: string
 *      responses:
 *        200:
 *          description: 返回成功
 *        data:
 *          description: 返回的数据
 * */
router.post('/register', async(req, res) => {
  const {username, nickname, email, password} = req.body;
  /** 1:判断必填信息有没有没填的 */
  if(!username || !nickname || !email || !password){
    new Result(null,'请填写完整信息').fail(res)
  }
  /** 2:判断用户的邮箱有没有注册过 */
  const hasUser = await models.tb_user.findOne({where:{email}})
  if(hasUser){
    return new Result(null,'该邮箱已经注册过了').fail(res);
  }
  /** 3:写入到数据库一条注册信息，状态置为0验证中 */
  bcrypt.hash(password, 10, async (err, hash) => {
    const userInfo = { username, nickname, email, password: hash, status:0, identity:0}
    const newUser = await models.tb_user.create(userInfo)
    if(newUser) {
      const title = 'Snine的验证码'
      const verCode = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
      const SendTime = new Date()
      console.log(SendTime);
      await models.tb_verify.create({Email:email,Code:verCode,SendTime,Total:1}) //把发送的验证码存入数据库
      const result = await sendEmail(email, title,verCode)
      new Result(null,'注册成功，请在邮件激活你的账户').success(res)
    }
  })
});

router.post('/login', async(req, res) => {
  const {email,password} = req.body;
  if(!email || !password){
    new Result(null,'请填写完整信息').fail(res)
  }
  const hasUser = await models.tb_user.findOne({where:{email}})
  if(!hasUser){
    new Result(null,'没有当前用户，请确认您是否注册').fail(res)
  }
  if (bcrypt.compareSync(password, hasUser.password)) {
    let tokenData = { username: hasUser.username, nickname: hasUser.nickname, email: hasUser.email,id:hasUser.id,identity:hasUser.identity}
    let token = jwt.sign(tokenData, SECRET_KEY, { expiresIn: EXPIRES_TIME, }) //传入数据 秘钥 过期时间
    let data = {
      token: `Bearer ${token}`,
      username: hasUser.username, 
      nickname: hasUser.nickname, 
      email: hasUser.email
    }
    new Result(data, `登录成功`).success(res)
  } else {
    new Result(null, `密码错误`).fail(res)
  }
})


router.post('/getEmailCode', async(req, res) => {
  const {email} = req.body
  const title = '来自Snine的验证码'
  const verCode = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
  const result = await sendEmail(email, title,verCode)
  res.send(result)
})



module.exports = router;
