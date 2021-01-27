const express = require('express');
const router = express.Router();
const jwtAuth = require('../utils/jwt');
const {CODE_ERROR} = require('../utils/constant');
const Result = require('../utils/Result')
const boom = require('boom')

const userRouter = require('./user');
const uploadRouter = require('./upload');
const queryRouter = require('./query');
router.use(jwtAuth)

router.use('/user', userRouter);
router.use('/upload', uploadRouter);
router.use('/query', queryRouter);


/** 匹配路由不存在的情况放在所有router最后面 */
router.use((req, res, next) => {
    next(boom.notFound('接口不存在'))
})

/** 错误处理放在所有路由之后这样才可以拦截所有错误 */
router.use((err, req, res, next) => {
    if (err.name && err.name == 'UnauthorizedError') {
        const { status = 401, message } = err 
        new Result(null,'token过期,请重新登录',{
            error: status,
            errMsg: message
        })
        .jwtError(res.status(status))
    } else {
        const msg = (err && err.message) || '系统错误';
        const statusCode = (err.output && err.output.statusCode) || 500;
        const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message;
        res.status(statusCode).json({
            code: CODE_ERROR,
            msg,
            error: statusCode,
            errorMsg
        })
    }
  })

module.exports = router;
