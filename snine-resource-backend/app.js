const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const allRouter = require('./routes/index');
const app = express();
const cors = require('cors')

require('express-async-errors');
require('./utils/swagger')(app)

/** 使用各种中间件 */
// app.use(cors({
//   origin:['http://localhost:3000'],  //指定接收的地址
//   methods:['GET','POST'],  //指定接收的请求类型
//   alloweHeaders:['Content-Type','Authorization']  //指定header
// }))
app.use(cors())
app.use(logger('dev')); //仅在dev开发环境下打印日志
app.use(express.json()); //让POST的请求参数JSON格式化，req.body可以拿到
app.use(express.urlencoded({ extended: false })); //类似表单提交参数获取
app.use(express.static(path.join(__dirname, 'public')));//静态文件资源目录
app.use('/api', allRouter);//把所有的api单独拿出去，让结构更清晰
app.use(function(req, res, next) {
  next(createError(404));
});//当没有匹配到所有路由的时候返回一个404
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});//检测到错误的时候，拿到错误信息并返回出去

module.exports = app; //暴露app实例在bin/www 下面引入使用  启动项目
