let jwt = require('express-jwt')
let {SECRET_KEY} = require('../constant')

module.exports = jwt({
    secret:SECRET_KEY,
    algorithms: ['HS256'],
    credentialsRequired: true,
}).unless({
    path:[
        // '/',
        '/api/user/login',
        '/api/user/register',
        // '/api/upload/file',
        // '/api/articles/allArticle',
        // '/api/types/getAllType',
        // /^\/image.*/, //动态的路由需要用这种正则的方式去匹配
        // '/api/articles/getAll',
        // /^\/api\/articles\/allArticle\/.*/,
        // '/api/articles/getHotArticle',
        // '/api/tags/test',
        // /^\/api\/paper\/\/*/
    ]
})