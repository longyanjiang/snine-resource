export default function (ctx) {
    const { $axios, redirect, store } = ctx
    // console.log('拦截的地方拿到的ctx', ctx);
    $axios.defaults.baseURL = `http://localhost:5288/api`
    $axios.defaults.timeout = 5000

    // request interceptor
    $axios.interceptors.request.use(
        config => {
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )
    $axios.onRequest(config => {
        // console.log('本次请求地址 ' + config.url,config)
        // const token = store.state.user.userInfo.token;
        const storeCache = sessionStorage.getItem('storeCache')
        const token = JSON.parse(storeCache).user.userInfo.token
        if (token) {
            config.headers.Authorization = token
        }
        return config;
    })

    $axios.interceptors.response.use(
        response => {
            // return response
            if (response.data.code == 401) {
                // 返回401，token验证失败，清除客户端cookie
                // 重定向到登录页面， 这里做一个判断，容错：req.url 未定义
                if (req.url) {
                    redirect("/login?ref=" + req.url)
                } else {
                    redirect("/login")
                }
            } else if (response.data.code == 404) {
                // 重定向到404页面
                redirect("/")
            }
            else {
                // 请求接口数据正常，返回数据
                return response
            }
        },
        error => {
            console.log('err' + error)
            return Promise.reject(error)
        }
    )

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/404')
        } else if (code === 500) {
            redirect('/500')
        }
    })
}