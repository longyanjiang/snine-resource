export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'zh-CN',
      amp: true
    },
    title: 'Snine | 小助手',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Snine，一款简洁的文件资源存储系统' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/index.less'
  ],
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src:'@/plugins/element-ui', ssr: true},
    {src:'@/plugins/axios', ssr: true},
    {src:'@/plugins/router', ssr: true},
    {src:'@/plugins/directive/clipboard', ssr: false},
    {src:'~plugins/echarts', mode: 'spa' },
    {src:'~/plugins/filter.js', ssr: true},
    {src:'~/plugins/api-repositories.js', ssr: false},
    { src: '~/plugins/storeCache', ssr: false },
  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],
  axios: {
    proxy: true,
    prefix: '/api/',
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/json; charset=UTF-8'
    // },
    // credentials: true,
  },
  proxy: {
    // "/api": {
    //   target: process.env.NODE_ENV === 'development' ? 'http://localhost:5288/api' : 'http://localhost:5288/api',
    //   changeOrigin: true
    // },
    '/api': {
      target: 'http://localhost:5288/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    },
    // "/api" : 'https://api.jlongyan.cn'
 },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
    // vendor: ['axios'],//防止重复渲染
  }
}
