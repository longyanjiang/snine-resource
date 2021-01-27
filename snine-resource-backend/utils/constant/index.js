module.exports = {
    CODE_ERROR: -1,    //失败
    CODE_SUCCESS: 1,  //成功
    CODE_TOKEN_EXPIRED: -2,//token验证失败
    CODE_REPEAT: -3,  //数据库已经存在xx值
    CODE_WARNING: -4, //警告
    SECRET_KEY: 'snine_resource_key',
    EXPIRES_TIME: 60 * 60 * 60  
}