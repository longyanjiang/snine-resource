export default ({ app, store,redirect}) => {
    app.router.beforeEach((to, from, next) => {
        let isClient = process.client; //判断是否是客户端
        const {token} = store.state.user.userInfo
        console.log(token,'有没有token');
        next()
    })
}